import * as THREE from 'three';
import { setupLighting } from '../environment/Lighting.js';
import { PlayFieldMap } from '../Maps/PlayFieldMap.js';
import { setupCamera } from '../environment/Camera.js';

export class SceneHandler {
  constructor() {
    this.scene = new THREE.Scene();
    console.log('Crating scene');
    console.log(this.scene);
    //Map
    this.scene.background = new THREE.Color(0x223344);
    this.map = new PlayFieldMap(100, 250);
    console.log('Created map');
    // Lighting
    console.log(this.map);
    setupLighting(this.scene);
    console.log('Added lighting to scene');
    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    document.body.appendChild(this.renderer.domElement);
    console.log('Created renderer and finished generating scene handler.');
    console.log(this.renderer);
    //Camera 
    const {camera, controls} = setupCamera(this.renderer, this.map, );
    this.camera = camera;
    this.controls = controls;
    console.log('Generating camera');
  }

  update() {
    this.controls.update();
  }

  initialize() {
    this.map.generate(this.scene);
    console.log('Scene children:', this.scene.children);
  }

  getScene() {
    return this.scene;
  }

  resize(width, height) {
    this.renderer.setSize(width, height);
  }

  getRenderer() {
    return this.renderer;
  }

  getCamera() {
    return this.camera;
  }

  cleanup() {
    this.map.destroy();
  }
}
