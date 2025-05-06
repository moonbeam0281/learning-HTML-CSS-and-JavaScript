import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CubeAgent } from './CubeAgent.js';
import { InteractionManager } from './InteractionManager.js';
//Global functions

// Scene setup
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
camera.position.z = 5;
camera.position.y = 10;

//Floor
const textureLoader = new THREE.TextureLoader();
const grassTexture = textureLoader.load('https://threejs.org/examples/textures/terrain/grasslight-big.jpg');
grassTexture.wrapS = THREE.RepeatWrapping;
grassTexture.wrapT = THREE.RepeatWrapping;
grassTexture.repeat.set(10, 10);
const floorGeometry = new THREE.PlaneGeometry(20, 20);
const floorMaterial = new THREE.MeshStandardMaterial({ map: grassTexture });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2; // Rotate to lay flat
floor.position.y = 0; // Position it below the cube
floor.receiveShadow = true;
scene.add(floor);

//Field

const fieldSize = 10;

const fenceMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ffff,
    transparent: true,
    opacity: 0.5
  });
  
  const fenceThickness = 0.2;
  const fenceHeight = 1;
  
  const fences = [];
  
  // Four sides of the square
  const fenceConfigs = [
    { x: 0, y: fenceHeight / 2, z: -fieldSize, w: 20, d: fenceThickness }, // back
    { x: 0, y: fenceHeight / 2, z: fieldSize,  w: 20, d: fenceThickness }, // front
    { x: -fieldSize, y: fenceHeight / 2, z: 0, w: fenceThickness, d: 20 }, // left
    { x: fieldSize,  y: fenceHeight / 2, z: 0, w: fenceThickness, d: 20 }  // right
  ];
  
  for (const cfg of fenceConfigs) {
    const geo = new THREE.BoxGeometry(cfg.w, fenceHeight, cfg.d);
    const mesh = new THREE.Mesh(geo, fenceMaterial);
    mesh.position.set(cfg.x, cfg.y, cfg.z);
    scene.add(mesh);
    fences.push(mesh);
}

//Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2); // soft white light
scene.add(ambientLight);

// Light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
directionalLight.position.set(5, 10, 5);
directionalLight.castShadow = true;

const directionalLight2 = new THREE.DirectionalLight(0x00ff00, 0.6);
directionalLight2.position.set(-5,10,-5);

function setUpLights(light) {
  light.shadow.mapSize.set(2048, 2048); // higher res for smoother shadows

  const size = 30; // <-- increase this to cover beyond the floor edges
  light.shadow.camera.left = -size;
  light.shadow.camera.right = size;
  light.shadow.camera.top = size;
  light.shadow.camera.bottom = -size;

  light.shadow.camera.near = 1;
  light.shadow.camera.far = 100; // more range

  light.shadow.bias = -0.001; // reduce shadow acne
  scene.add(light);
}

setUpLights(directionalLight);
setUpLights(directionalLight2);

//Background color
scene.background = new THREE.Color(0x012040); 


// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);


// Physics settings
const gravity = -0.001;
const bounceFactor = 0.5;
const friction = 0.98;
const floorY = 0.5;
const agents = [];
for (let i = 0; i < 5; i++) {
  const pos = new THREE.Vector3((Math.random() - 0.5) * 10, 5 + Math.random() * 5, (Math.random() - 0.5) * 10);
  agents.push(new CubeAgent(pos, scene));
}

const controls = new OrbitControls(camera, renderer.domElement);
const interactionManager = new InteractionManager(camera, renderer, agents, controls);

// Animate
function animate() {
  requestAnimationFrame(animate);

  for (let i = 0; i < agents.length; i++) {
    agents[i].update(gravity, bounceFactor, friction, floorY, fieldSize);
    for (let j = 0; j < agents.length; j++) {
      if (i !== j) agents[i].collideWith(agents[j]);
    }
  }

  controls.update();
  renderer.render(scene, camera);
}
animate();


// Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});