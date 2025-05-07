// CubeShape.js
import * as THREE from 'three';
import { IShape } from '../../interface/IShape.js';

export class Cube extends IShape {
  constructor(position = new THREE.Vector3(0, 0, 0)) {
    super();
    this.position = position;
    this.mesh = this.createMesh();
    this.commands = new [];
  }

  createMesh() {
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff88 });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.copy(this.position);
    return cube;
  }

  executeCommand(){
    //commands here
  }

  destroy() {
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
  }
}