import * as THREE from 'three';
import { setupLighting } from '../environment/Lighting.js';
import { setupCamera } from '../environment/Camera.js';
import { MapHandler } from './MapHandler.js';

export class SceneHandler {
  constructor(scene, map) {
    /*
    this.scene = scene;
    console.log('Crating scene');
    console.log(this.scene);*/
    //Map
    scene.add(map.mesh);
    console.log('Created map');
    // Lighting
    setupLighting(scene);
    console.log('Added lighting to scene');
    // Renderer
    /*
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
    console.log('Generating camera');*/
  }
}
