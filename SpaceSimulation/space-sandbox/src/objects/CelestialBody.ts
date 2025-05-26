import * as THREE from 'three';

export class CelestialBody {
    public mesh: THREE.Mesh;
    public mass: number;
    public velocity: THREE.Vector3;

    private trailGeometry: THREE.BufferGeometry;
    private trailLine: THREE.Line;
    private trailPositions: THREE.Vector3[] = [];
    private maxTrailLength = 60;


    constructor(
        radius: number,
        mass: number,
        position: THREE.Vector3,
        velocity: THREE.Vector3,
        color = 0xffffff
    ) {
        this.mass = mass;
        this.velocity = velocity;

        const geometry = new THREE.SphereGeometry(radius, 32, 32);
        const material = new THREE.MeshStandardMaterial({ color });
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.copy(position);

        // Create trail line
        this.trailGeometry = new THREE.BufferGeometry().setFromPoints([position.clone()]);
        const trailMaterial = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.5 });
        this.trailLine = new THREE.Line(this.trailGeometry, trailMaterial);

        // Add trail to same parent scene
        this.mesh.add(this.trailLine); // will follow mesh movement

    }

    update(deltaTime: number) {
        this.mesh.position.add(this.velocity.clone().multiplyScalar(deltaTime));

        // Add new position to trail
        this.trailPositions.push(this.mesh.position.clone());
        if (this.trailPositions.length > this.maxTrailLength) {
            this.trailPositions.shift(); // remove oldest
        }
        this.trailGeometry.setFromPoints(this.trailPositions);

    }
}
