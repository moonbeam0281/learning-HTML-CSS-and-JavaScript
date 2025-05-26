import { CelestialBody } from '../objects/CelestialBody';
import * as THREE from 'three';

export class PhysicsEngine {
  private bodies: CelestialBody[];
  private readonly G = 0.001; // Gravitational constant

  constructor(bodies: CelestialBody[]) {
    this.bodies = bodies;
  }

  public update(deltaTime: number) {
    for (let i = 0; i < this.bodies.length; i++) {
      const a = this.bodies[i];

      for (let j = 0; j < this.bodies.length; j++) {
        if (i === j) continue;
        const b = this.bodies[j];

        const dir = new THREE.Vector3().subVectors(b.mesh.position, a.mesh.position);
        const distance = dir.length();
        const forceMagnitude = this.G * (a.mass * b.mass) / (distance * distance + 0.1); // avoid 0

        const force = dir.normalize().multiplyScalar(forceMagnitude);
        const acceleration = force.divideScalar(a.mass);

        a.velocity.add(acceleration.multiplyScalar(deltaTime));
      }
    }

    // Update positions after applying all forces
    for (const body of this.bodies) {
      body.update(deltaTime);
    }
  }

  public addBody(body: CelestialBody) {
    this.bodies.push(body);
  }

  public getBodies() {
    return this.bodies;
  }
}
