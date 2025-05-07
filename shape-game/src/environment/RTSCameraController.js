export class RTSCameraController {
    constructor(camera, domElement) {
      this.camera = camera;
      this.domElement = domElement;
      this.isDragging = false;
      this.lastMouse = { x: 0, y: 0 };
      this.dragSpeed = 0.1;
      this.fixedHeight = camera.position.y;
  
      this.initListeners();
    }
  
    initListeners() {
      this.domElement.addEventListener('contextmenu', e => e.preventDefault()); // prevent right-click menu
  
      this.domElement.addEventListener('mousedown', (e) => {
        if (e.button === 2) { // Right click
          this.isDragging = true;
          this.lastMouse.x = e.clientX;
          this.lastMouse.y = e.clientY;
        }
      });
  
      this.domElement.addEventListener('mouseup', (e) => {
        if (e.button === 2) {
          this.isDragging = false;
        }
      });
  
      this.domElement.addEventListener('mousemove', (e) => {
        if (!this.isDragging) return;
  
        const dx = e.clientX - this.lastMouse.x;
        const dy = e.clientY - this.lastMouse.y;
  
        // Pan the camera
        const moveX = -dx * this.dragSpeed;
        const moveZ = -dy * this.dragSpeed;
  
        this.camera.position.x += moveX;
        this.camera.position.z += moveZ;
  
        // Keep camera height constant
        this.camera.position.y = this.fixedHeight;
  
        // Update target/lookAt if needed
        const lookAt = new THREE.Vector3(
          this.camera.position.x,
          0,
          this.camera.position.z
        );
        this.camera.lookAt(lookAt);
  
        this.lastMouse.x = e.clientX;
        this.lastMouse.y = e.clientY;
      });
    }
  
    update() {
      // Future: Add inertia or keyboard control
    }
  }
  