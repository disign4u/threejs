
import React, {Suspense, useRef, useState,createContext} from "react";
import {Canvas, useFrame } from "@react-three/fiber";
import {OrbitControls, Text, PerspectiveCamera } from '@react-three/drei'
import Loading from "../component/Loader.jsx";
import {Leva, useControls} from "leva";
import BudokaAvatar from "./BudokaAvatar.jsx";
import HeroCamera from "./HeroCamera.jsx";
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
            position: [1, 3, 1.5],
            text: {
                scale:[5, 5, .5],
                position:[5,1,1],
                anchorX:"left",
                anchorY:"middle",
                label: "11.Gerader Stich zum Bauch",
            }
        }, {
            color: 'yellow',
            position: [0, 7, 0],
            text: {
                scale:[5, 5, .5],
                position:[-5,1,1],
                anchorX:"right",
                anchorY:"middle",
                label: "diagonal zum Hals 2.",
            }
        }, {
            color: 'yellow',
            position: [-2, 4.5, -0.5],
            text: {
                scale:[5, 5, .5],
                position:[-5,1,1],
                anchorX:"right",
                anchorY:"middle",
                label: "waagrecht zum Ellenbogen 4.",
            }
        },{
            color: 'yellow',
            position: [-1, -1.5, 0],
            text: {
                scale:[5, 5, .5],
                position:[-5,1,1],
                anchorX:"right",
                anchorY:"middle",
                label: "Schlag zum Knie 6.",
            }
        }, {
            color: 'yellow',
            position: [0.3, 5.5, 1],
            text: {
                scale:[5, 5, .5],
                position:[-5,1,1],
                anchorX:"right",
                anchorY:"middle",
                label: "Stich zur Brust 8.",
            }
        }, {
            color: 'yellow',
            position: [1, 8.5, 1],
            text: {
                scale:[5, 5, .5],
                position:[-5,1,1],
                anchorX:"right",
                anchorY:"middle",
                label: "Schlag auf den Kopf 10.",
            }
        }, {
            color: 'yellow',
            position: [1, 3, 1.5],
            text: {
                scale:[5, 5, .5],
                position:[-5,1,1],
                anchorX:"right",
                anchorY:"middle",
                label: "Gerader Stich zum Bauch 12.",
            }
        },
    ]
    const refCanvas = useRef();
    const refGroup = useRef();
    const [hitOne, setHitOne] = useState(true);
    const [showText, setShowText] = useState(true);
    const [isRotating, setIsRotating] = useState(true);
    ;

    const getMeshes = () => {
        const meshes = refGroup.current.children.filter((child) => child.type === 'Mesh');
        console.log(meshes);
    }
    const HeroContext = createContext();
    return (
        <section className="threejs" id="home">
            <Leva  hideTitleBar={true}
                   collapsed={true}
                   hidden={false} />

            <div className="threejs__container">

                <Canvas className="threejs__canvas" ref={refCanvas}>
                    <Suspense fallback={<Loading/>}>
                        <PerspectiveCamera makeDefault position={[0, 0, 30]}/>
                        <HeroCamera isRotating={isRotating}>
                            <group position={[controls.positionX, controls.positionY, 0]} scale={controls.scale}
                                   ref={refGroup}>
                                <BudokaAvatar scale={8}
                                              position={[1, -6, 0]}
                                              rotation={[0, 0, 0]}/>

                                {hitMeshPoints.map((hitMeshPoint, index) => (
                                    <mesh
                                        key={index}
                                        position={hitMeshPoint.position}
                                        scale={.125}
                                        visible={hitOne ? true : false}
                                        name={`hit_${index}`}>
                                        <sphereGeometry args={[2, 12, 12]}/>
                                        <meshLambertMaterial color={hitMeshPoint.color}/>
                                        <Text
                                            scale={hitMeshPoint.text.scale}
                                            position={hitMeshPoint.text.position}
                                            anchorX={hitMeshPoint.text.anchorX}
                                            anchorY={hitMeshPoint.text.anchorY}
                                            color={hitMeshPoint.color}>
                                            {showText ? hitMeshPoint.text.label : ""}
                                        </Text>
                                    </mesh>
                                ))}
                            </group>
                        </HeroCamera>
                        <ambientLight intensity={0.5}/>
                        <directionalLight position={[10, 10, 10]} intensity={3}/>
                    </Suspense>
                    <OrbitControls/>
                </Canvas>
            </div>
            <ul className="navbar">
                <li>
                    <button id="hit_1" onClick={() => setHitOne(!hitOne)}>Ausblenden</button>
                </li>
                <li>
                    <button id="hit_2" onClick={() => setShowText(!showText)}>Text</button>
                </li>
                <li>
                    <button id="hit_3" onClick={() => getMeshes()}>Meshes</button>
                </li>
                <li>
                    <button id="hit_3" onClick={() => setIsRotating(!isRotating)}>Rotate</button>
                </li>
            </ul>
        </section>
    )
}