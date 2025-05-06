import * as THREE from 'three';

export class InteractionManager {
  constructor(camera, renderer, agents, controls) {
    this.camera = camera;
    this.renderer = renderer;
    this.agents = agents;
    this.controls = controls;

    this.mouse = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();
    this.plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    this.planeIntersect = new THREE.Vector3();

    this.dragging = false;
    this.selectedMesh = null;
    this.dragOffset = new THREE.Vector3();

    this.initEvents();
  }

  initEvents() {
    window.addEventListener('mousedown', this.onMouseDown.bind(this));
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
    window.addEventListener('mouseup', this.onMouseUp.bind(this));
  }

  updateMouse(event) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  onMouseDown(event) {
    this.updateMouse(event);

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.agents.map(a => a.mesh));

    if (intersects.length > 0) {
      this.dragging = true;
      this.selectedMesh = intersects[0].object;
      this.controls.enabled = false;

      this.plane.setFromNormalAndCoplanarPoint(
        new THREE.Vector3(0, 1, 0),
        this.selectedMesh.position
      );

      this.raycaster.ray.intersectPlane(this.plane, this.planeIntersect);
      this.dragOffset.subVectors(this.selectedMesh.position, this.planeIntersect);
    }
  }

  onMouseMove(event) {
    this.updateMouse(event);

    if (this.dragging && this.selectedMesh) {
      this.raycaster.setFromCamera(this.mouse, this.camera);
      if (this.raycaster.ray.intersectPlane(this.plane, this.planeIntersect)) {
        this.selectedMesh.position.x = this.planeIntersect.x + this.dragOffset.x;
        this.selectedMesh.position.z = this.planeIntersect.z + this.dragOffset.z;

        const agent = this.agents.find(a => a.mesh === this.selectedMesh);
        if (agent) {
          agent.velocity.set(0, 0, 0);
          agent.targetRotation.set(0, 0, 0);
        }
      }
    }
  }

  onMouseUp() {
    this.dragging = false;
    this.selectedMesh = null;
    this.controls.enabled = true;
  }
}
