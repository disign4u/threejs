import {useRef} from 'react';
import {useFrame} from '@react-three/fiber';

const TargetCamera = ({children, ...props}) => {
    const groupCamera = useRef();
    useFrame((state, delta) => {
        props.isRotating ? groupCamera.current.rotation.y += 0.25 * delta : groupCamera.current.rotation.y = 0;
    })
    return <group ref={groupCamera}>{children}</group>;
}
export default TargetCamera;
