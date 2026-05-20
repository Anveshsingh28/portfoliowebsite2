import { Environment, Float, MeshTransmissionMaterial } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import { ArrowRight, BrainCircuit, Terminal } from "lucide-react";
import { useRef } from "react";
import * as THREE from "three";

const reveal = {
  hidden: { opacity: 0, y: 28, filter: "blur(14px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
  },
};

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.12,
    },
  },
};

function AntigravityCore() {
  const groupRef = useRef(null);
  const ringRef = useRef(null);

  useFrame(({ clock, pointer }, delta) => {
    const elapsed = clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.x += delta * 0.18;
      groupRef.current.rotation.y += delta * 0.26;
      groupRef.current.position.y = Math.sin(elapsed * 0.9) * 0.18;
      groupRef.current.position.x = THREE.MathUtils.damp(groupRef.current.position.x, pointer.x * 0.18, 3, delta);
    }

    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.34;
      ringRef.current.rotation.x = Math.sin(elapsed * 0.42) * 0.32;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.45} floatIntensity={0.85}>
      <group ref={groupRef}>
        <mesh castShadow>
          <icosahedronGeometry args={[1.18, 5]} />
          <MeshTransmissionMaterial
            color="#9dfcff"
            backside
            samples={8}
            thickness={0.8}
            chromaticAberration={0.22}
            anisotropy={0.38}
            distortion={0.28}
            distortionScale={0.52}
            temporalDistortion={0.12}
            roughness={0.08}
            metalness={0.1}
            transmission={0.96}
            attenuationDistance={0.82}
            attenuationColor="#ff00ff"
          />
        </mesh>

        <mesh ref={ringRef}>
          <torusGeometry args={[1.82, 0.012, 16, 180]} />
          <meshBasicMaterial color="#00FFFF" transparent opacity={0.78} blending={THREE.AdditiveBlending} />
        </mesh>

        <mesh rotation={[Math.PI / 2.7, 0, Math.PI / 5]}>
          <torusGeometry args={[2.22, 0.008, 16, 180]} />
          <meshBasicMaterial color="#FF00FF" transparent opacity={0.5} blending={THREE.AdditiveBlending} />
        </mesh>
      </group>
    </Float>
  );
}

function HeroObject() {
  return (
    <div className="relative h-[380px] min-h-[320px] w-full lg:h-[520px]">
      <div className="absolute inset-6 rounded-full bg-cyan-300/10 blur-3xl" />
      <Canvas
        dpr={[1, 1.8]}
        camera={{ position: [0, 0, 5.8], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.42} />
        <pointLight position={[3, 3, 4]} intensity={9} color="#00FFFF" />
        <pointLight position={[-4, -1, 2]} intensity={5} color="#FF00FF" />
        <AntigravityCore />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="hero" className="grid min-h-[calc(100vh-7rem)] items-center gap-8 py-10 lg:grid-cols-[1.03fr_0.97fr] lg:py-16">
      <motion.div variants={container} initial="hidden" animate="visible" className="relative">
        <motion.div
          variants={reveal}
          className="glass-panel mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs uppercase tracking-[0.24em] text-cyan-100"
        >
          <BrainCircuit className="relative z-10 h-4 w-4" />
          <span className="relative z-10">CSE AI/ML Portfolio</span>
        </motion.div>

        <motion.h1
          variants={reveal}
          className="neon-text max-w-5xl text-balance text-5xl font-black leading-[0.96] tracking-normal text-white sm:text-6xl lg:text-7xl xl:text-8xl"
        >
          YOUR NAME builds antigravity AI systems.
        </motion.h1>

        <motion.p variants={reveal} className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
          Replace this line with your strongest portfolio pitch: applied ML, LLM agents, computer vision,
          vector databases, and production software engineering.
        </motion.p>

        <motion.div variants={reveal} className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="#projects"
            className="glass-panel group inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-cyan-50 transition hover:border-cyan-300/30 hover:bg-cyan-300/10"
          >
            <span className="relative z-10">Inspect Projects</span>
            <ArrowRight className="relative z-10 ml-3 h-4 w-4 transition group-hover:translate-x-1" />
          </a>
          <a
            href="#terminal"
            className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-slate-200 shadow-glass backdrop-blur-xl transition hover:border-fuchsia-300/30 hover:text-white"
          >
            <Terminal className="mr-3 h-4 w-4 text-fuchsia-200" />
            Ask Codex
          </a>
        </motion.div>

        <motion.div variants={reveal} className="mt-9 grid max-w-2xl grid-cols-3 gap-3">
          {[
            ["99.2%", "eval accuracy"],
            ["42ms", "edge latency"],
            ["128k", "token context"],
          ].map(([metric, label]) => (
            <div key={label} className="glass-panel rounded-lg p-4">
              <div className="relative z-10 text-xl font-black text-white">{metric}</div>
              <div className="relative z-10 mt-1 text-[10px] uppercase tracking-[0.18em] text-slate-400">{label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 28 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
        className="glass-panel rounded-lg p-3"
      >
        <HeroObject />
      </motion.div>
    </section>
  );
}
