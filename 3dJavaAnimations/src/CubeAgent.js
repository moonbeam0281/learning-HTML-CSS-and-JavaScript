import * as THREE from 'three';

export class CubeAgent {
  constructor(position, scene) {
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshPhongMaterial({
      color: 0x0281ff,
      shininess: 100,
      specular: 0xaaaaaa,
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.castShadow = true;
    this.mesh.position.copy(position);
    scene.add(this.mesh);

    this.boundingBox = new THREE.Box3().setFromObject(this.mesh);

    this.angle = Math.random() * Math.PI * 2;
    this.speed = 0.05;
    this.velocity = new THREE.Vector3();

    this.isAirborne = true; // Tracks airborne state
  }

  update(gravity, bounceFactor, friction, floorY, fieldSize) {
    const pos = this.mesh.position;

    // Update velocity from angle
    this.velocity.x = Math.sin(this.angle) * this.speed;
    this.velocity.z = Math.cos(this.angle) * this.speed;

    // Apply velocity
    pos.x += this.velocity.x;
    pos.z += this.velocity.z;

    // Gravity & landing behavior
    if (pos.y > floorY + 0.01) {
      this.isAirborne = true;
      this.velocity.y = (this.velocity.y || 0) + gravity;
      pos.y += this.velocity.y;
    } else {
      if (this.velocity.y !== undefined) {
        pos.y += this.velocity.y;
      }

      if (pos.y <= floorY) {
        pos.y = floorY;
        this.velocity.y *= -bounceFactor;

        if (Math.abs(this.velocity.y) < 0.01 && this.isAirborne) {
          this.isAirborne = false;
          this.angle = Math.random() * Math.PI * 2; // Face new random direction
        }
      }
    }

    // Bounce off walls with simple reflection
    if (pos.x < -fieldSize + 0.5) {
      pos.x = -fieldSize + 0.5;
      this.angle = Math.PI - this.angle;
    }

    if (pos.x > fieldSize - 0.5) {
      pos.x = fieldSize - 0.5;
      this.angle = Math.PI - this.angle;
    }

    if (pos.z < -fieldSize + 0.5) {
      pos.z = -fieldSize + 0.5;
      this.angle = -this.angle;
    }

    if (pos.z > fieldSize - 0.5) {
      pos.z = fieldSize - 0.5;
      this.angle = -this.angle;
    }

    // Update facing direction
    this.mesh.rotation.y = this.angle;

    // Update bounding box
    this.boundingBox.setFromObject(this.mesh);
  }

  collideWith(other) {
    if (!this.boundingBox.intersectsBox(other.boundingBox)) return;

    const dir = new THREE.Vector3().subVectors(this.mesh.position, other.mesh.position).normalize();
    this.angle = Math.atan2(dir.x, dir.z);
    this.mesh.position.add(dir.multiplyScalar(0.1));
  }
}