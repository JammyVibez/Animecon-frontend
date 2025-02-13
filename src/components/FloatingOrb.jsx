import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const FloatingOrb = () => {
  const orbRef = useRef();

  useFrame(({ clock }) => {
    orbRef.current.position.y = Math.sin(clock.getElapsedTime()) * 1.5;
  });

  return (
    <mesh ref={orbRef} position={[0, 0, -5]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial emissive={"#ff00ff"} emissiveIntensity={2} />
    </mesh>
  );
};

export default FloatingOrb;
