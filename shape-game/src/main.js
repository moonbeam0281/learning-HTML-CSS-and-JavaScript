import { SceneHandler } from './handlers/SceneHandler.js';

window.addEventListener('load', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Scene setup
const sceneHandler = new SceneHandler();
sceneHandler.initialize();
const scene = sceneHandler.getScene();
const renderer = sceneHandler.getRenderer();
const camera = sceneHandler.getCamera();

// Animation loop
//let startTime = performance.now();
function animate() {
  requestAnimationFrame(animate);
  //const elapsed = (performance.now() - startTime) / 1000;
  sceneHandler.update();
  renderer.render(scene, camera);
  //console.log(`Scene running for: ${elapsed.toFixed(2)}s`);
}
animate();

// Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});