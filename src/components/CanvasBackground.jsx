import { PointMaterial, Points, Preload } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { memo, useMemo, useRef } from "react";
import * as THREE from "three";

const NODE_COUNT = 160;
const STREAM_COUNT = 28;

function createNodeField(count) {
  const positions = new Float32Array(count * 3);
  const speeds = new Float32Array(count);

  for (let index = 0; index < count; index += 1) {
    const stride = index * 3;
    positions[stride] = THREE.MathUtils.randFloatSpread(18);
    positions[stride + 1] = THREE.MathUtils.randFloat(-9, 9);
    positions[stride + 2] = THREE.MathUtils.randFloat(-12, 5);
    speeds[index] = THREE.MathUtils.randFloat(0.045, 0.16);
  }

  return { positions, speeds };
}

function AntigravityNodes() {
  const pointsRef = useRef(null);
  const lineRef = useRef(null);
  const { viewport, pointer } = useThree();

  const field = useMemo(() => createNodeField(NODE_COUNT), []);
  const linePositions = useMemo(() => {
    const lines = new Float32Array(STREAM_COUNT * 2 * 3);

    for (let i = 0; i < STREAM_COUNT; i += 1) {
      const stride = i * 6;
      const x = THREE.MathUtils.randFloatSpread(16);
      const y = THREE.MathUtils.randFloat(-8, 8);
      const z = THREE.MathUtils.randFloat(-10, -2);
      lines[stride] = x;
      lines[stride + 1] = y;
      lines[stride + 2] = z;
      lines[stride + 3] = x + THREE.MathUtils.randFloat(-0.35, 0.35);
      lines[stride + 4] = y + THREE.MathUtils.randFloat(0.7, 1.9);
      lines[stride + 5] = z + THREE.MathUtils.randFloat(-0.2, 0.2);
    }

    return lines;
  }, []);

  useFrame(({ clock }, delta) => {
    const elapsed = clock.getElapsedTime();

    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array;

      for (let index = 0; index < NODE_COUNT; index += 1) {
        const stride = index * 3;
        positions[stride + 1] += field.speeds[index] * delta;
        positions[stride] += Math.sin(elapsed * 0.22 + index) * 0.0025;

        if (positions[stride + 1] > 9.5) {
          positions[stride + 1] = -9.5;
          positions[stride] = THREE.MathUtils.randFloatSpread(18);
          positions[stride + 2] = THREE.MathUtils.randFloat(-12, 5);
        }
      }

      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      pointsRef.current.rotation.y = pointer.x * 0.055;
      pointsRef.current.rotation.x = -pointer.y * 0.035;
    }

    if (lineRef.current) {
      const positions = lineRef.current.geometry.attributes.position.array;

      for (let i = 0; i < STREAM_COUNT; i += 1) {
        const stride = i * 6;
        const rise = 0.12 * delta;
        positions[stride + 1] += rise;
        positions[stride + 4] += rise;

        if (positions[stride + 1] > 9.5) {
          const x = THREE.MathUtils.randFloatSpread(16);
          const y = -9.5;
          const z = THREE.MathUtils.randFloat(-10, -2);
          positions[stride] = x;
          positions[stride + 1] = y;
          positions[stride + 2] = z;
          positions[stride + 3] = x + THREE.MathUtils.randFloat(-0.35, 0.35);
          positions[stride + 4] = y + THREE.MathUtils.randFloat(0.7, 1.9);
          positions[stride + 5] = z;
        }
      }

      lineRef.current.geometry.attributes.position.needsUpdate = true;
      lineRef.current.rotation.y = pointer.x * 0.035;
      lineRef.current.rotation.x = -pointer.y * 0.02;
    }
  });

  return (
    <group position={[0, 0, -3]} scale={viewport.width < 7 ? 0.78 : 1}>
      <Points ref={pointsRef} positions={field.positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00FFFF"
          size={0.045}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.82}
        />
      </Points>

      <lineSegments ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color="#FF00FF"
          transparent
          opacity={0.18}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

function ParallaxRig() {
  const groupRef = useRef(null);
  const { pointer } = useThree();

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.position.x = THREE.MathUtils.damp(groupRef.current.position.x, pointer.x * 0.42, 2.6, delta);
    groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, pointer.y * 0.26, 2.6, delta);
  });

  return (
    <group ref={groupRef}>
      <AntigravityNodes />
    </group>
  );
}

function CanvasBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 7.5], fov: 58, near: 0.1, far: 60 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#050711"]} />
        <fog attach="fog" args={["#0B0B1A", 6, 26]} />
        <ParallaxRig />
        <Preload all />
      </Canvas>
    </div>
  );
}

export default memo(CanvasBackground);
