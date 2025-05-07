import * as THREE from 'three';
import { SceneHandler } from './handlers/SceneHandler.js';
import { MapHandler } from './handlers/MapHandler.js';
import { setupCamera } from './environment/Camera.js';

// Scene setup
//const sceneHandler = new SceneHandler();
//sceneHandler.initialize();
const mainscene = new THREE.Scene();


//Map Handler and selector
const mapSelect = document.getElementById('mapSelect');
const maphandler = new MapHandler(mainscene, mapSelect);
maphandler.loadMaps();

//Renderer
const canvas = document.getElementById('canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
mainscene.add(maphandler.getMapMesh());

//Camera and handeler
const { camera, controls } = setupCamera(renderer, maphandler.activeMap);
//const scene = sceneHandler.scene;
//const camera = sceneHandler.camera;

console.log("Logging every object...");
console.log("mainScene: ");
console.log("Canvas: ")
console.log(canvas)
console.log("Renderer: ")
console.log(renderer);
console.log(mainscene);
console.log("mapHadpler: ");
console.log(maphandler);
console.log("Camera and controls");
console.log(camera);
console.log(controls);

//Scene Handler 
const sceneHandler = new SceneHandler(mainscene, maphandler.activeMap);
console.log('Generating scene handler');

mapSelect.addEventListener('change', (event) => {
  const selectedMapName = event.target.value;
  console.log('User selected map:', selectedMapName);

  // Example: find the matching map object and load it
  const selectedMap = maphandler.maps.find(m => m.mapName === selectedMapName);
  if (selectedMap != null) {
    maphandler.cleanup();
    maphandler.activeMap = selectedMap;
    selectedMap.generate();
    mainscene.add(selectedMap.mesh); // or whatever object(s) it generates
  }
});

// Animation loop
//let startTime = performance.now();
function animate() {
  requestAnimationFrame(animate);
  //const elapsed = (performance.now() - startTime) / 1000;

  renderer.render(mainscene, camera);
  controls.update();
  //console.log(`Scene running for: ${elapsed.toFixed(2)}s`);
}
animate();

// Resize
window.addEventListener('resize', () => {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

window.addEventListener('load', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
});