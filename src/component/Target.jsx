
import {Suspense, useRef, useState,useEffect } from "react";
import {Canvas, useFrame } from "@react-three/fiber";
import {OrbitControls, Text, PerspectiveCamera } from '@react-three/drei'
import Loading from "../component/Loader.jsx";
import {Leva, useControls} from "leva";
import BudokaAvatar from "./BudokaAvatar.jsx";
import TargetCamera from "./TargetCamera.jsx";
import {hitMeshPoints} from "../constants/index.js";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { IoMdCheckboxOutline } from "react-icons/io";
import { FaPlay, FaStop, FaPause, FaBackward } from "react-icons/fa";

import './target.css'

const song = new Audio("budoka/workout.mp3");
let meshes = [];

export const Target = (props) => {

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
    const refCanvas = useRef();
    const refGroup = useRef();
    const refAudio = useRef();
    const [hitOne, setHitOne] = useState(true);
    const [showText, setShowText] = useState(false);
    const [isRotating, setIsRotating] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [timer, setTimer] = useState(0);

    // Array für die Meshes
    const getMeshes = (id) => {
        meshes = refGroup.current.children.filter((child) => child.type === 'Mesh');
    }

    const onPlaying = (e)=> {
        return;
        console.log(e);
    }

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

    const Workout = () => {
        const audioRef = useRef(song);
        const toggleWorkout = () => {
            if (isPlaying) {
                audioRef.current.pause();
              setIsPlaying(false);
            } else {
                setIsPlaying(true);
                audioRef.current.play().catch((error) => {
                    console.log("Audio konnte nicht abgespielt werden:", error);
                });
                audioRef.current.ontimeupdate = () => {
                    setTimer(audioRef.current.currentTime);
                };
            }
        };

        const resetWorkout = () => {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            timer = 0;
        };

        return (
            <div className="workout">
                <button>
                    <FaBackward color="#fff" size="10" onClick={() => resetWorkout()}/>
                </button>
                <button>
                    Training: <time>{timer.toFixed(2)}</time>
                </button>
                <button  onClick={()  => toggleWorkout()}>
                    {isPlaying ? <FaPause color="#fff" size="10"/> : <FaPlay color="#fff" size="10"/> }
                </button>
            </div>
        );
    };

    return (

        <section className="target" id="home">
            <audio controls={true} src="/threejs/budoka/song.mp3" ref={refAudio} onPlay={onPlaying}></audio>

            <Leva hideTitleBar={true}
                  collapsed={true}
                  hidden={true}/>

            <div className="target__container">

                <Canvas className="target__canvas" ref={refCanvas}>
                    <Suspense fallback={<Loading/>}>
                        <PerspectiveCamera makeDefault position={[0, 0, 30]}/>
                        <TargetCamera isRotating={isRotating}>

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
                        </TargetCamera>
                        <ambientLight intensity={1}/>
                        <directionalLight position={[10, 10, 10]} intensity={3}/>
                    </Suspense>
                    <OrbitControls/>
                </Canvas>
            </div>

            <ul className="navbar">
                <li>
                    <Workout/>
                </li>
                <li>
                    <button id="hit_2" onClick={() => setShowText(!showText)}>
                        {showText
                            ? <IoMdCheckboxOutline color="#fff" size="20" onClick={() => setShowText(!showText)}/>
                            :
                            <MdCheckBoxOutlineBlank color="#fff" size="20" onClick={() => setShowText(!showText)}/>
                        } Text
                    </button>
                </li>
                <li>
                    <button id="hit_3" onClick={() => setIsRotating(!isRotating)}>
                        {isRotating
                            ? <IoMdCheckboxOutline color="#fff" size="20" onClick={() => setIsRotating(!isRotating)}/>
                            :
                            <MdCheckBoxOutlineBlank color="#fff" size="20" onClick={() => setIsRotating(!isRotating)}/>
                        }
                        Drehen
                    </button>
                </li>
            </ul>
        </section>
    )

}