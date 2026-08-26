'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Float,
  ContactShadows,
  Environment,
  RoundedBox,
  useTexture,
  MeshTransmissionMaterial,
} from '@react-three/drei';
import * as THREE from 'three';

/* ─────────── A single 3D tile with image texture ─────────── */
function AMathTile({ position, textureSrc, rotation = [0, 0, 0], delay = 0, scale = 1 }) {
  const groupRef = useRef();
  const texture = useTexture(textureSrc);

  // Set texture filtering for crisp look
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(t * 0.6 + delay) * 0.06 + rotation[0];
      groupRef.current.rotation.y = Math.cos(t * 0.4 + delay) * 0.06 + rotation[1];
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.8}>
      <group ref={groupRef} position={position} scale={scale}>
        {/* Back face – solid colour */}
        <RoundedBox args={[1.1, 1.1, 0.14]} radius={0.1} smoothness={4} castShadow receiveShadow>
          <meshPhysicalMaterial
            color="#f5a623"
            roughness={0.22}
            metalness={0.05}
            clearcoat={0.5}
            clearcoatRoughness={0.12}
            envMapIntensity={0.6}
          />
        </RoundedBox>

        {/* Front face – tile image */}
        <mesh position={[0, 0, 0.075]} castShadow>
          <planeGeometry args={[1.0, 1.0]} />
          <meshStandardMaterial
            map={texture}
            transparent
            roughness={0.3}
            metalness={0.05}
          />
        </mesh>

        {/* Subtle inner glow ring */}
        <mesh position={[0, 0, -0.075]}>
          <planeGeometry args={[1.0, 1.0]} />
          <meshStandardMaterial
            color="#f5a623"
            roughness={0.4}
            metalness={0.05}
            transparent
            opacity={0.8}
          />
        </mesh>
      </group>
    </Float>
  );
}

/* ─────────── Glowing particle orbits ─────────── */
function GlowParticles({ count = 40 }) {
  const meshRef = useRef();

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 2.2 + Math.random() * 1.5;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 3;
      pos[i * 3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * 1.5;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#8b83ff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

/* ─────────── Floating glass sphere accent ─────────── */
function GlassSphere({ position, size = 0.2, color = '#6c63ff' }) {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(t * 0.8) * 0.15;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshPhysicalMaterial
        color={color}
        roughness={0.05}
        metalness={0.1}
        clearcoat={1}
        clearcoatRoughness={0.05}
        transparent
        opacity={0.35}
        envMapIntensity={1.5}
      />
    </mesh>
  );
}

/* ─────────── Main scene composition ─────────── */
function TileScene() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      // Slow global orbit to keep the scene alive
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.15) * 0.12;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.1, -0.5]}>
      {/* Main tiles – spread in a nice constellation */}
      <AMathTile
        position={[-1.5, 1.2, 0]}
        textureSrc="/images/tiles/tile-plus.png"
        rotation={[0.15, 0.3, 0]}
        delay={0}
        scale={0.95}
      />
      <AMathTile
        position={[1.5, 0.8, 0.4]}
        textureSrc="/images/tiles/tile-multiply.png"
        rotation={[-0.15, -0.25, 0.1]}
        delay={1.5}
        scale={1.0}
      />
      <AMathTile
        position={[-0.8, -0.9, 0.2]}
        textureSrc="/images/tiles/tile-7.png"
        rotation={[0.1, 0.1, -0.15]}
        delay={3}
        scale={0.88}
      />
      <AMathTile
        position={[1.2, -0.8, -0.4]}
        textureSrc="/images/tiles/tile-equals.png"
        rotation={[-0.2, 0.15, 0]}
        delay={2}
        scale={0.92}
      />
      <AMathTile
        position={[0.0, 1.8, -0.2]}
        textureSrc="/images/tiles/tile-9.png"
        rotation={[0.12, -0.08, 0.1]}
        delay={4}
        scale={0.85}
      />
      <AMathTile
        position={[-1.7, -0.1, -0.6]}
        textureSrc="/images/tiles/tile-minus.png"
        rotation={[0.08, 0.2, -0.1]}
        delay={2.5}
        scale={0.78}
      />
      <AMathTile
        position={[0.5, -1.5, 0.1]}
        textureSrc="/images/tiles/tile-divide.png"
        rotation={[-0.1, -0.12, 0.05]}
        delay={3.5}
        scale={0.82}
      />

      {/* Glass sphere accents */}
      <GlassSphere position={[2.0, 1.5, -0.8]} size={0.12} color="#6c63ff" />
      <GlassSphere position={[-2.0, -0.4, 0.8]} size={0.09} color="#00d2ff" />
      <GlassSphere position={[0.8, 2.2, 0.3]} size={0.15} color="#ff6b9d" />
      <GlassSphere position={[-0.4, -1.8, -0.5]} size={0.10} color="#a78bfa" />

      {/* Particles */}
      <GlowParticles count={50} />
    </group>
  );
}

/* ─────────── Canvas wrapper ─────────── */
export default function Hero3DModel() {
  return (
    <div className="hero-3d-container">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 38 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#0a0a14']} />
        
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 8, 5]} intensity={1.0} castShadow color="#f0f0ff" />
        <directionalLight position={[-3, 4, -2]} intensity={0.4} color="#6c63ff" />
        <spotLight position={[-5, 10, 8]} angle={0.2} penumbra={1} intensity={1.2} color="#fff" />
        <pointLight position={[0, -2, 3]} intensity={0.3} color="#00d2ff" />

        {/* Scene */}
        <TileScene />

        {/* Ground shadows */}
        <ContactShadows
          position={[0, -2.8, 0]}
          opacity={0.2}
          scale={12}
          blur={2.5}
          far={4}
        />

        {/* Environment for reflections */}
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
