// PlayFieldMap.js
import * as THREE from 'three';
import { iMap } from '../../interface/iMap.js';

export class PlayFieldMap extends iMap {
  constructor(width, lenght) {
    super();
    this.objects = [];
    this.width = width;
    this.lenght = lenght;
  }

  generate(scene) {
    const floorGeometry = new THREE.PlaneGeometry(this.width, this.lenght);
    const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.x = 0;
    floor.position.z = 0;
    floor.receiveShadow = true;
    scene.add(floor);
    this.objects.push(floor);
  }

  getFloor() {
    return this.objects;
  }

  destroy() {
    this.objects.forEach(obj => {
      obj.geometry?.dispose();
      obj.material?.dispose();
    });
    this.objects = [];
  }
}