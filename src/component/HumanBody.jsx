import React, {useRef} from 'react'
import {useAnimations, useGLTF} from '@react-three/drei'

const HumanBody = (props) => {
    const group = useRef()
    const { nodes, materials, animations } = useGLTF('/threejs/models/human_body_org.glb')
    const { actions } = useAnimations(animations, group)
    return (
        <group ref={group} {...props} dispose={null}>
            <group name="Sketchfab_Scene">
                <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
                    <group name="f542659f21ce4decaad3836a0235e414fbx" rotation={[Math.PI / 2, 0, 0]}>
                        <group name="Object_2">
                            <group name="RootNode">
                                <group name="GenHuman" position={[0, 1.807, 0.055]} />
                                <group name="rig" rotation={[-Math.PI / 2, 0, 0]}>
                                    <group name="Object_6">
                                        <primitive object={nodes._rootJoint} />
                                        <skinnedMesh
                                            name="Object_9"
                                            geometry={nodes.Object_9.geometry}
                                            material={materials.Sycranian}
                                            skeleton={nodes.Object_9.skeleton}
                                        />
                                        <group name="Object_8" position={[0, 1.807, 0.055]} />
                                    </group>
                                </group>
                                <group name="Floor">
                                    <mesh
                                        name="Floor_Floor_0"
                                        castShadow
                                        receiveShadow
                                        geometry={nodes.Floor_Floor_0.geometry}
                                        material={materials.Floor}
                                    />
                                </group>
                            </group>
                        </group>
                    </group>
                </group>
            </group>
        </group>
    )
}
useGLTF.preload('/threejs/models/human_body_org.glb')
export default HumanBody;


