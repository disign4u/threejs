#TODO
- 3d arrows point to hitpoint
- add some threejs stuff    
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## usefull
rm -rf node_modules/.vite/
npm cache clean --force
npm i && npm run dev
unter windows hat das geholfen
/node_modules/.bin/vite dasSystem kann den angegebenen Pfad nicht finden.

npx vite

https://r3f.docs.pmnd.rs/getting-started/examples
## gsap
npm i @gsap/react gsap

## for Math noobs :-)
npm i maath

## remove Warnings
npm i @react-three/eslint-plugin --save-dev
add to eslint.config.js under plugins
plugins: {
react,
'react-three': ReactThreeFiber,
},

add rule
'react/no-unknown-property': 'off',
352

I faced a similar issue on my Arch Linux machine. Apparently my issue was an HTTP buffer issue. I got it to work by using

git config http.postBuffer 524288000
followed by

git pull && git push


import React, {useState, useRef, useEffect} from 'react'
import {Canvas, useFrame} from "@react-three/fiber";
import {OrbitControls, PerspectiveCamera} from '@react-three/drei'
import {gsap} from "gsap";
import Stoppuhr from "./components/stoppuhr/Stoppuhr.jsx";
import Musik from "./components/Musik/Musik.jsx";
import {hitMeshPoints} from "./constants/index.js";
import './Budoka.css'

let meshes = []; // Array für die Meshes

const Target = ({position}) => {
const meshRef = useRef();

    useEffect(() => {
        gsap.to(meshRef.current.scale, {
            x: 0,
            y: 0,
            z: 0,
            opacity: 1,
            duration: 0.5, // Anpassbar an die Schwierigkeit
            repeat: 1,
            yoyo: true,
            delay: Math.random() * 2 // Zufälliger Startzeitpunkt
        });
    }, []);

    return (
        <mesh ref={meshRef} position={position} scale={.2}>
            <sphereGeometry args={[2, 12, 12]}/>
            <meshStandardMaterial color="red"/>
        </mesh>
    );
}

const Budoka = () => {
const [count, setCount] = useState(0);
const meshGroup = useRef();
const workout = new Audio("sounds/workout.mp3");

    useEffect(() => {
        console.clear();

    }, []);

    const getMeshes = () => {
        if (meshGroup.current) {
            meshes = meshGroup.current.children.filter((child) => child.type === 'Mesh');
        }
    }

    const objShake = (mesh_id) => {
        if(!meshes.length) getMeshes();

        const obj = meshes[mesh_id];
        if (obj) {
            gsap.to(obj.scale, {
                x: 1,
                y: 1,
                z: 1,
                opacity: 1,
                duration: 0.25, // Anpassbar an die Schwierigkeit
                repeat: 1,
                yoyo: true,
                delay: 0
            });
        }
    }
    return (
        <div className="App">
            <button onClick={() => objShake(1)}>Shake</button>
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 30]}/>
                <ambientLight intensity={0.5}/>
                <directionalLight position={[10, 10, 10]} intensity={3}/>
                <OrbitControls/>
                <group ref={meshGroup}>
                    {hitMeshPoints.map((hitMeshPoint, index) => (
                        <Target position={hitMeshPoint.position} key={index}/>
                    ))}
                </group>
            </Canvas>
        </div>
    )
}

export default Budoka