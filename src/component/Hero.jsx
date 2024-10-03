import React, {Suspense, useRef, useState} from "react";
import {Canvas} from "@react-three/fiber";
import {OrbitControls, Text, PerspectiveCamera } from '@react-three/drei'
import Loading from "../component/Loader.jsx";
import {Leva, useControls} from "leva";
import HumanPoints from "./HumanPoints.jsx";
import MeinAvatar from "./MeinAvatar.jsx";

import './hero.css';
import './style.css';

export const Hero = (props
) => {
    const controls = useControls({
        scale : {
            label: 'Größe',
            value: 8,
            min: 0,
            max: 10,
            step: 0.5
        },positionX : {
            label: 'Position X',
            value: 0,
            min: -10,
            max: 10,
            step: 0.5
        },positionY : {
            label: 'Position Y',
            value: -8,
            min: -20,
            max: 20,
            step: 0.5
        }
    })

    //const [active, setActive] = useState(false)
    //console.log(HumanPoints.nodes);
    // Subscribe this component to the render-loop, rotate the mesh every frame
    //useFrame((state, delta) => (HumanPoints.current.rotation.x += delta))
    // Return view, these are regular three.js elements expressed in JSX

    const refCanvas = useRef();
    const [hitOne, setHitOne] = useState(true);

    return (
        <section className="threejs" id="home">
            <Leva  hideTitleBar={true}
                   collapsed={true}
                   hidden={false} />

            <div className="threejs__container">
                {/*https://r3f.docs.pmnd.rs/api/hooks*/}
                <Canvas className="threejs__canvas" ref={refCanvas}>
                    <Suspense fallback={<Loading/>}>
                        <PerspectiveCamera makeDefault position={[0, 0, 30]}/>
                        <MeinAvatar
                            scale={controls.scale}
                            position={[controls.positionX, controls.positionY, 0]}
                            rotation={[0, 0, 0]}/>
                        <mesh
                            visible={hitOne ? true : false}
                            position={[1, 5,0]}
                            scale={0.15}>
                            <sphereGeometry args={[2, 12, 12]}/>
                            <meshBasicMaterial color={'red'}/>
                            <Text
                                scale={[5, 5, .5]}
                                position={[5,1,1]}
                                color="red" // default
                                anchorX="left" // default
                                anchorY="middle" // default
                            >
                                1. diagonal zum Hals
                            </Text>
                        </mesh>

                        <mesh
                            position={[-1, 5, 0]}
                            scale={0.15}>
                            <sphereGeometry args={[2, 12, 12]}/>
                            <meshBasicMaterial color={'orange'}/>
                        </mesh>
                        <ambientLight intensity={0.5}/>
                        <directionalLight position={[10, 10, 10]} intensity={3}/>
                    </Suspense>
                    <OrbitControls/>
                </Canvas>
            </div>
            <ul className="navbar">
                <li>
                    <button id="hit_1" onClick={() => setHitOne(!hitOne)}>Schlag 1</button>
                </li>
            </ul>
        </section>
    )
}