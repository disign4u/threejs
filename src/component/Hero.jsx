import React, {Suspense} from "react";
import {Canvas} from "@react-three/fiber";
import {PerspectiveCamera} from "@react-three/drei";
import Loading from "../component/Loader.jsx";
import {Leva, useControls} from "leva";
import HumanPoints from "./HumanPoints.jsx";
import './hero.css';

export const Hero = () => {
    const controls = useControls({
        scale : {
            value: 8,
            min: 0,
            max: 10,
            step: 0.5
        }
    })

    //console.log(nodes);

    return (
        <section className="threejs" id="home">
            <Leva  hideTitleBar={true}
                   collapsed={true}
                   hidden={false} />

            <div className="threejs__container">
                <Canvas className="threejs__canvas">
                    <Suspense fallback={<Loading/>}>
                        <PerspectiveCamera makeDefault position={[0,0,30]}/>
                        <HumanPoints
                            scale={controls.scale}
                            position={[0,-5,0]}
                            rotation={[0, 0, 0]}/>
                        <ambientLight intensity={0.5}/>
                        <directionalLight position={[10,10,10]} intensity={3}/>
                    </Suspense>
                </Canvas>
            </div>
        </section>
    )
}