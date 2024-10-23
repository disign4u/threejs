
import React, {Suspense, useRef, useState,createContext,useEffect,Component } from "react";
import {Canvas, useFrame } from "@react-three/fiber";
import {OrbitControls, Text, PerspectiveCamera } from '@react-three/drei'
import Loading from "../component/Loader.jsx";
import {Leva, useControls} from "leva";
import BudokaAvatar from "./BudokaAvatar.jsx";
import HeroCamera from "./HeroCamera.jsx";
import './hero.css';
import './style.css';

const song = new Audio("budoka/song.mp3");

const AudioComponent = () => {
    const audioRef = useRef(song);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState();

    const toggleAudio = () => {
        if (isPlaying) {
            audioRef.current.pause();
            //audioRef.current.currentTime = 0;
        } else {
            audioRef.current.currentTime = 0;
            audioRef.current.volume = 0.25;
            audioRef.current.play().catch((error) => {
                console.log("Audio konnte nicht abgespielt werden:", error);
            });
            audioRef.current.ontimeupdate = () => {
                setCurrentTime(audioRef.current.currentTime);
            };
        }

        setIsPlaying(!isPlaying);
    };

    return (
        <div>
            <button onClick={toggleAudio}>
                {isPlaying ? "Stop" : "Play"}
                <time>{audioRef.current.currentTime.toFixed(2)}</time>{" "}
                {/* Format time to 2 decimals */}
            </button>
        </div>
    );
};

const Box = (props) =>{
// This reference will give us direct access to the mesh
    const meshRef = useRef()
// Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
// Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (meshRef.current.rotation.x += delta))
// Return view, these are regular three.js elements expressed in JSX
    return (
        <mesh
            {...props}
            ref={meshRef}
            scale={active ? 1.5 : 1}
            onClick={(event) => setActive(!active)}
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
    )
}

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
            value: -1,
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
    const refAudio = useRef();
    const [hitOne, setHitOne] = useState(false);
    const [showText, setShowText] = useState(true);
    const [isRotating, setIsRotating] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [timer, setTimer] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const meshes = useRef([]); // Array für die Meshes
    const timeline = useRef(null);

    const getMeshes = (id) => {
        const meshesPoints = refGroup.current.children.filter((child) => child.type === 'Mesh');
        meshesPoints[id].visible = true;
    }

    const HeroContext = createContext();

    const handleEvent = ()=> {
        console.log(refAudio.current);
    }

    function Target({ position }) {
        const meshRef = useRef();

        useEffect(() => {
            gsap.to(meshRef.current.scale, {
                x: 1.2,
                y: 1.2,
                z: 1.2,
                duration: 0.5, // Anpassbar an die Schwierigkeit
                repeat: -1,
                yoyo: true,
                delay: Math.random() * 2 // Zufälliger Startzeitpunkt
            });
        }, []);

        return (
            <mesh ref={meshRef} position={position}>
                <sphereGeometry {...sphereGeometryProps} />
                <meshStandardMaterial color="red" />
            </mesh>
        );
    }

    useEffect(() => {
        console.log('useEffect');
        const interval = setInterval(() => {
            if (refAudio.current) {
                setCurrentTime(refAudio.current.currentTime);
            }
        }, 100); // Aktualisiere alle 100ms

        //

        // Erstelle 12 Meshes und speichere sie in meshes.current
        for (let i = 0; i < 12; i++) {
            console.log(i)
        }

        // Erstelle eine Timeline
        return () => clearInterval(interval);
    }, []);
    return (

        <section className="threejs" id="home">
            <Leva hideTitleBar={true}
                  collapsed={true}
                  hidden={false}/>

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
                    <AudioComponent />
                </li>
                <li>
                    <button id="hit_1" onClick={() => setTimer(0)}>Start</button>
                </li>
                <li>
                    <button id="hit_2" onClick={() => setShowText(!showText)}>Text</button>
                </li>
                <li>
                    <button id="hit_3" onClick={() => getMeshes(1)}>Meshes</button>
                </li>
                <li>
                    <button id="hit_3" onClick={() => setIsRotating(!isRotating)}>Rotate</button>
                </li>
                <audio controls={true} src="/threejs/budoka/workout.mp3" ref={refAudio} onPlay={handleEvent}></audio>
                <li>{currentTime}</li>
            </ul>
        </section>
    )

}