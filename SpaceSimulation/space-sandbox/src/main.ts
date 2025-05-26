import { SceneManager } from './core/SceneManager';
import { CelestialBody } from './objects/CelestialBody';
import { PhysicsEngine } from './core/PhysicsEngine';
import { ClickHandler } from './core/ClickHandler';
import * as THREE from 'three';

const manager = new SceneManager();
manager.start();

const bodies: CelestialBody[] = [];

// Add a sun
const sun = new CelestialBody(
  8,
  5000,
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(0, 0, 0),
  0xffff00
);
bodies.push(sun);
manager.getScene().add(sun.mesh);

const engine = new PhysicsEngine(bodies);

// Add click-to-spawn
new ClickHandler(manager.getCamera(), manager.getScene(), manager.getRenderer(), engine);

function animate() {
  requestAnimationFrame(animate);
  engine.update(0.016);
  manager.getRenderer().render(manager.getScene(), manager.getCamera());
}

animate();
