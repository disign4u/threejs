
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

export const Target = (props
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
    const refCanvas = useRef();
    const refGroup = useRef();
    const refAudio = useRef();
    const [hitOne, setHitOne] = useState(true);
    const [showText, setShowText] = useState(true);
    const [isRotating, setIsRotating] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [timer, setTimer] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const meshes = useRef([]);
    // Array für die Meshes
    const timeline = useRef(null);

    const getMeshes = (id) => {
        const meshesPoints = refGroup.current.children.filter((child) => child.type === 'Mesh');
        meshesPoints[id].visible = true;
    }

    const handleEvent = ()=> {

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


    return (

        <section className="target" id="home">
            <audio controls={true} src="/threejs/budoka/song.mp3" ref={refAudio} onPlay={handleEvent}></audio>
            <Leva hideTitleBar={true}
                  collapsed={true}
                  hidden={false}/>

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
                    <AudioComponent/>
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
                    <button id="hit_3" onClick={() => setIsRotating(!isRotating)}>

                        {isRotating ? "Stop Drehen" : "Start Drehen"}
                    </button>
                </li>
                <li>
                    <MdCheckBoxOutlineBlank />
                    <IoMdCheckboxOutline />
                    <FaPlay/>
                    <FaPause/>
                    <FaBackward/>
                </li>
            </ul>
        </section>
    )

}