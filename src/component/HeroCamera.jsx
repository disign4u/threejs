import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const HeroCamera = ({children}) => {
    const group = useRef();
    console.log(children);

    useFrame((state, delta) => {

    })
    return <group ref={group}>{children}</group>;
}
export default HeroCamera;
