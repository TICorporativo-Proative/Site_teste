import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stage, PerspectiveCamera } from '@react-three/drei';

interface ModelViewerProps {
  url: string;
  color?: string;
  autoRotate?: boolean;
  className?: string;
  height?: string;
}

// Model component
const Model = ({ url, color = '#2196F3' }: { url: string; color?: string }) => {
  const { scene } = useGLTF(url);
  
  // Clone the scene to avoid modifying the cached original
  const clonedScene = scene.clone();
  
  // Apply color to all meshes in the scene
  clonedScene.traverse((node: any) => {
    if (node.isMesh) {
      node.material = node.material.clone();
      node.material.color.set(color);
    }
  });
  
  return <primitive object={clonedScene} scale={1.5} />;
};

// Fallback component while loading
const ModelFallback = () => {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#cccccc" />
    </mesh>
  );
};

const ModelViewer = ({ 
  url, 
  color = '#2196F3', 
  autoRotate = true, 
  className = '',
  height = '400px'
}: ModelViewerProps) => {
  return (
    <div className={`bg-gray-100 rounded-lg overflow-hidden ${className}`} style={{ height }}>
      <Canvas shadows dpr={[1, 2]}>
        <color attach="background" args={['#f5f5f5']} />
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        
        <Stage environment="city" intensity={0.6}>
          <Suspense fallback={<ModelFallback />}>
            <Model url={url} color={color} />
          </Suspense>
        </Stage>
        
        <OrbitControls 
          autoRotate={autoRotate} 
          autoRotateSpeed={1} 
          enableZoom={true}
          enablePan={false}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI - Math.PI / 6}
        />
      </Canvas>
    </div>
  );
};

export default ModelViewer;