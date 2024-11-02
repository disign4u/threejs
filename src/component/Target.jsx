
import {Suspense, useRef, useState , useEffect} from "react";
import {Canvas } from "@react-three/fiber";
import {OrbitControls, Text, PerspectiveCamera } from '@react-three/drei'
import {gsap} from "gsap";
import Loading from "../component/Loader.jsx";
import BudokaAvatar from "./BudokaAvatar.jsx";
import TargetCamera from "./TargetCamera.jsx";
import {hitMeshPoints} from "../constants/index.js";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { IoMdCheckboxOutline } from "react-icons/io";
import { FaPlay, FaStop, FaPause } from "react-icons/fa";

import './target.css'

const song = new Audio("budoka/workout.mp3");

export const Target = (props) => {
    const refCanvas = useRef();
    const refGroup = useRef();
    const refAudio = useRef();
    const [hitOne, setHitOne] = useState(true);
    const [showText, setShowText] = useState(false);
    const [isRotating, setIsRotating] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    let [timer, setTimer] = useState(0);
    let meshes = []; // Array für die Meshes


    const onPlaying = (e)=> {
        return;
    }

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

    const Meshes = ({position}) => {
        const meshRef = useRef();
        useEffect(() => {
            gsap.to(meshRef.current.scale, {
                x: .35,
                y: .35,
                z: .35,
                opacity: 1,
                duration: 0.15, // Anpassbar an die Schwierigkeit
                repeat: 5,
                yoyo: true,
                delay: Math.random() * 2,
                onComplete: () => {
                    meshRef.current.scale.set(0, 0, 0);
                }
            });
        }, []);
        return (
            <mesh ref={meshRef} position={position} scale={0}>
                <sphereGeometry args={[2, 12, 12]}/>
                <meshStandardMaterial color="green"/>
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
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
                setTimer(0);
                setIsPlaying(false);
            }
        };

        return (
            <div className="workout">
                <button onClick={()  => resetWorkout()}>
                    <FaStop color="#fff" size="10" />
                </button>
                <button className="workout__timer">
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

            <div className="target__container">

                <Canvas className="target__canvas" ref={refCanvas}>
                    <Suspense fallback={<Loading/>}>
                        <PerspectiveCamera makeDefault position={[0, 0, 30]}/>
                        <TargetCamera isRotating={isRotating}>
                            <group position={[-1, 0, 0]} scale={1}
                                   ref={refGroup}>

                                <BudokaAvatar scale={8}
                                              position={[1, -6, 0]}
                                              rotation={[0, 0, 0]}/>
                                <Meshes position={[5, 0, 0]} />
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