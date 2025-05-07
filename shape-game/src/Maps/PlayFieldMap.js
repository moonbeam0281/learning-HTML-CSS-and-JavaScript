// PlayFieldMap.js
import * as THREE from 'three';
import { iMap } from '../../interface/iMap.js';
import grassImage from '../assets/grass.jpg';

export class PlayFieldMap extends iMap {
  constructor(width, lenght) {
    super(width, lenght);
    this.objects = [];
    this.width = width;
    this.lenght = lenght;
    this.textureLoader = new THREE.TextureLoader();
  }

  generate(scene) {
    const floorGeometry = new THREE.PlaneGeometry(this.width, this.lenght);

    const grassTexture = this.textureLoader.load(
      grassImage,
      (texture) => {
        console.log('Texture loaded:', texture);
      },
      undefined,
      (err) => {
        console.error('Texture load failed:', err);
      }
    );
    console.log(grassTexture);
    grassTexture.wrapS = THREE.RepeatWrapping;
    grassTexture.wrapT = THREE.RepeatWrapping;
    grassTexture.repeat.set(15, 15);

    const floorMaterial = new THREE.MeshStandardMaterial({
      map: grassTexture
    });

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