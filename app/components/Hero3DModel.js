'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, ContactShadows, Environment, MathJax } from '@react-three/drei';
import * as THREE from 'three';

// A single floating A-Math Tile
function AMathTile({ position, text, score, rotation, color = "#ffcf54", delay = 0 }) {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // Subtle additional rotation
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(time + delay) * 0.1 + rotation[0];
      meshRef.current.rotation.y = Math.cos(time * 0.8 + delay) * 0.1 + rotation[1];
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1} position={position}>
      <mesh ref={meshRef} castShadow receiveShadow>
        {/* Tile body */}
        <boxGeometry args={[1, 1, 0.2]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
        
        {/* Tile text */}
        <Text
          position={[0, 0, 0.11]}
          fontSize={0.6}
          color="#111"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2"
        >
          {text}
        </Text>
        
        {/* Tile score (small number bottom right) */}
        {score && (
          <Text
            position={[0.3, -0.3, 0.11]}
            fontSize={0.2}
            color="#333"
            anchorX="center"
            anchorY="middle"
            font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2"
          >
            {score}
          </Text>
        )}
      </mesh>
    </Float>
  );
}

// Group of mathematical symbols floating in background
function MathSymbols() {
  return (
    <group position={[0, 0, -2]}>
      <AMathTile position={[-2.5, 1.5, 0]} text="+" score="2" rotation={[0.2, 0.4, 0]} color="#f0f0f8" delay={0} />
      <AMathTile position={[2.5, 0.5, 1]} text="×" score="3" rotation={[-0.2, -0.3, 0.1]} color="#6c63ff" delay={1.5} />
      <AMathTile position={[-1.5, -1.5, 0.5]} text="7" score="1" rotation={[0.1, 0.1, -0.2]} color="#00d2ff" delay={3} />
      <AMathTile position={[1.8, -1.2, -1]} text="=" score="0" rotation={[-0.4, 0.2, 0]} color="#ff6b9d" delay={2} />
    </group>
  );
}

export default function Hero3DModel() {
  return (
    <div className="hero-3d-container" style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <spotLight position={[-10, 20, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
        
        <MathSymbols />
        
        {/* Soft shadow on the "floor" */}
        <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2} far={4} />
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
