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
            value: 1,
            min: 0,
            max: 10,
            step: 0.5
        },positionX : {
            label: 'Position X',
            value: 0,
            min: -100,
            max: 100,
            step: 0.5
        },positionY : {
            label: 'Position Y',
            value: 0,
            min: -100,
            max: 100,
            step: 0.5
        },meshX : {
            label: 'Mesh x',
            value:0,
            min: -10,
            max: 10,
            step: 0.5
        },meshY : {
            label: 'Mesh y',
            value:0,
            min: -10,
            max: 10,
            step: 0.5
        },meshZ : {
            label: 'Mesh z',
            value:0,
            min: -10,
            max: 10,
            step: 0.5
        }
    })

    const hitMeshPoints = [
        {
            color: 'red',
            position: [2, 7, 0],
            text: {
                scale:[5, 5, .5],
                position:[5,1,1],
                anchorX:"left",
                anchorY:"middle",
                label: "1. diagonal zum Hals",
            }
        }, {
            color: 'red',
            position: [4, 4.5, -0.5],
            text: {
                scale:[5, 5, .5],
                position:[5,1,1],
                anchorX:"left",
                anchorY:"middle",
                label: "3. waagrecht zum Ellenbogen",
            }
        },{
            color: 'red',
            position: [3, -1.5, 0],
            text: {
                scale:[5, 5, .5],
                position:[5,1,1],
                anchorX:"left",
                anchorY:"middle",
                label: "5. Schlag zum Knie",
            }
        }, {
            color: 'red',
            position: [1.7, 5.5, 1],
            text: {
                scale:[5, 5, .5],
                position:[5,1,1],
                anchorX:"left",
                anchorY:"middle",
                label: "7. Stich zur Brust",
            }
        }, {
            color: 'red',
            position: [1, 8.5, 1],
            text: {
                scale:[5, 5, .5],
                position:[5,1,1],
                anchorX:"left",
                anchorY:"middle",
                label: "9. Schlag auf den Kopf",
            }
        }, {
            color: 'red',
            position: [1, 2.5, 1.5],
            text: {
                scale:[5, 5, .5],
                position:[5,1,1],
                anchorX:"left",
                anchorY:"middle",
                label: "11.Gerader Stich zum Bauch",
            }
        },
    ]

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
                        <group  position={[controls.positionX, controls.positionY, 0]} scale={controls.scale} >
                            <MeinAvatar scale={8}
                                position={[1, -6, 0]}
                                rotation={[0, 0, 0]}/>
                            <mesh
                                visible={false}
                                position={[
                                    controls.meshX,
                                    controls.meshY,
                                    controls.meshZ
                                ]}
                                scale={0.125}>
                                <sphereGeometry args={[2, 12, 12]}/>
                                <meshLambertMaterial color={'red'}/>
                                <Text
                                    scale={[5, 5, .5]}
                                    position={[5,1,1]}
                                    color="red"
                                    anchorX="left"
                                    anchorY="middle">
                                    dummy
                                </Text>
                            </mesh>
                            {hitMeshPoints.map((hitMeshPoint, index) => (
                                <mesh
                                    key={index}
                                    position={hitMeshPoint.position}
                                    scale={.125}
                                    visible={hitOne ? true : false}>
                                    <sphereGeometry args={[2, 12, 12]}/>
                                    <meshLambertMaterial color={hitMeshPoint.color}/>
                                    <Text
                                        scale={hitMeshPoint.text.scale}
                                        position={hitMeshPoint.text.position}
                                        anchorX={hitMeshPoint.text.anchorX}
                                        anchorY={hitMeshPoint.text.anchorY}
                                        color={hitMeshPoint.color}>
                                        {hitMeshPoint.text.label}
                                    </Text>
                                </mesh>
                            ))}
                        </group>
                        <ambientLight intensity={0.5}/>
                        <directionalLight position={[10, 10, 10]} intensity={3}/>
                    </Suspense>
                    <OrbitControls />
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