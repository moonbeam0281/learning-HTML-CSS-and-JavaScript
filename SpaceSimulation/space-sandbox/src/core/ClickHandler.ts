import * as THREE from 'three';
import { CelestialBody } from '../objects/CelestialBody';
import { PhysicsEngine } from './PhysicsEngine';

export class ClickHandler {
    private camera: THREE.Camera;
    private scene: THREE.Scene;
    private renderer: THREE.WebGLRenderer;
    private physics: PhysicsEngine;
    private isDragging = false;
    private dragStart = new THREE.Vector2();
    private dragEnd = new THREE.Vector2();
    private raycaster = new THREE.Raycaster();
    private tempLine: THREE.Line | null = null;


    constructor(camera: THREE.Camera, scene: THREE.Scene, renderer: THREE.WebGLRenderer, physics: PhysicsEngine) {
        this.camera = camera;
        this.scene = scene;
        this.renderer = renderer;
        this.physics = physics;

        window.addEventListener('mousedown', this.onMouseDown);
        window.addEventListener('mousemove', this.onMouseMove);
        window.addEventListener('mouseup', this.onMouseUp);

    }

    private screenToWorld(screenPos: THREE.Vector2): THREE.Vector3 {
        const normalized = new THREE.Vector2(
            (screenPos.x / window.innerWidth) * 2 - 1,
            -(screenPos.y / window.innerHeight) * 2 + 1
        );

        this.raycaster.setFromCamera(normalized, this.camera);

        const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
        const worldPos = new THREE.Vector3();
        this.raycaster.ray.intersectPlane(plane, worldPos);
        return worldPos;
    }


    private onMouseDown = (event: MouseEvent) => {
        this.isDragging = true;
        this.dragStart.set(event.clientX, event.clientY);
    };

    private onMouseMove = (event: MouseEvent) => {
        if (!this.isDragging) return;

        this.dragEnd.set(event.clientX, event.clientY);

        // Optional: draw a visual line
        if (this.tempLine) this.scene.remove(this.tempLine);

        const start = this.screenToWorld(this.dragStart);
        const end = this.screenToWorld(this.dragEnd);

        const geometry = new THREE.BufferGeometry().setFromPoints([start, end]);
        const material = new THREE.LineBasicMaterial({ color: 0xffffff });
        this.tempLine = new THREE.Line(geometry, material);
        this.scene.add(this.tempLine);
    };

    private onMouseUp = (event: MouseEvent) => {
        if (!this.isDragging) return;
        this.isDragging = false;
        if (this.tempLine) {
            this.scene.remove(this.tempLine);
            this.tempLine = null;
        }

        const start = this.screenToWorld(this.dragStart);
        const end = this.screenToWorld(this.dragEnd);

        const velocity = new THREE.Vector3().subVectors(end, start).multiplyScalar(0.5);

        const newPlanet = new CelestialBody(
            1.5,
            5,
            start.clone(),
            velocity,
            0x66ffcc
        );

        this.scene.add(newPlanet.mesh);
        this.physics.addBody(newPlanet);
    };
}
