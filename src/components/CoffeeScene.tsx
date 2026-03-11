import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";

function CoffeeCup() {
  const cupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (cupRef.current) {
      cupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={cupRef} position={[0, -0.5, 0]}>
      {/* Cup body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.8, 0.6, 1.4, 32]} />
        <meshStandardMaterial color="#f5f0e8" roughness={0.3} metalness={0.1} />
      </mesh>
      {/* Cup inner (coffee) */}
      <mesh position={[0, 0.55, 0]}>
        <cylinderGeometry args={[0.72, 0.72, 0.15, 32]} />
        <meshStandardMaterial color="#3d1c02" roughness={0.2} metalness={0.3} />
      </mesh>
      {/* Handle */}
      <mesh position={[0.95, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.3, 0.08, 16, 32, Math.PI]} />
        <meshStandardMaterial color="#f5f0e8" roughness={0.3} metalness={0.1} />
      </mesh>
      {/* Saucer */}
      <mesh position={[0, -0.75, 0]}>
        <cylinderGeometry args={[1.2, 1.1, 0.1, 32]} />
        <meshStandardMaterial color="#f5f0e8" roughness={0.3} metalness={0.1} />
      </mesh>
    </group>
  );
}

function SteamParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 60;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 0.6;
      pos[i * 3 + 1] = Math.random() * 2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.6;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!particlesRef.current) return;
    const pos = particlesRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += 0.008;
      pos[i * 3] += Math.sin(state.clock.elapsedTime + i) * 0.001;
      if (pos[i * 3 + 1] > 2.5) {
        pos[i * 3 + 1] = 0;
        pos[i * 3] = (Math.random() - 0.5) * 0.6;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 0.6;
      }
    }
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef} position={[0, 0.3, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#c4a882" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

function FloatingBean({ position, speed }: { position: [number, number, number]; speed: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * speed;
    ref.current.rotation.z = state.clock.elapsedTime * speed * 0.5;
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.3;
  });

  return (
    <Float speed={speed} floatIntensity={0.5}>
      <mesh ref={ref} position={position}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#2d1810" roughness={0.6} metalness={0.2} />
      </mesh>
    </Float>
  );
}

export default function CoffeeScene() {
  const beans = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        position: [
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2 - 1,
        ] as [number, number, number],
        speed: 0.5 + Math.random() * 0.5,
        key: i,
      })),
    []
  );

  return (
    <Canvas
      camera={{ position: [0, 0.5, 4], fov: 45 }}
      style={{ position: "absolute", inset: 0 }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffd89b" />
      <pointLight position={[-3, 2, 2]} intensity={0.5} color="#c4a882" />
      <spotLight position={[0, 5, 0]} intensity={0.3} angle={0.5} color="#ffeedd" />

      <CoffeeCup />
      <SteamParticles />
      {beans.map((bean) => (
        <FloatingBean key={bean.key} position={bean.position} speed={bean.speed} />
      ))}

      <Environment preset="studio" />
    </Canvas>
  );
}
