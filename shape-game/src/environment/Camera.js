// Camera.js
import * as THREE from 'three';
import { RTSCameraController } from './RTSCameraController';



export function setupCamera(renderer, map) {
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  // Position camera at an RTS-like angle
  camera.position.set(0, 30, 10);
  camera.lookAt(0, 0, 0);

  // Setup custom RTS controller
  const controls = new RTSCameraController(camera, renderer.domElement, {width: map.width, length: map.lenght});

  console.log('Generated RTS-style camera.');

  return { camera, controls };
}