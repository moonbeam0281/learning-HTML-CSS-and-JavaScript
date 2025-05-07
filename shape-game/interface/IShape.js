// IShape.js - Shape Interface
export class IShape {
  constructor() {
    if (this.constructor === IShape) {
      throw new Error("Cannot instantiate interface directly");
    }
    this.commands = [];

  }

  executeCommand(){
    throw new Error("Method 'executeCommand() must be implemented")
  }

  createMesh() {
    throw new Error("Method 'createMesh()' must be implemented.");
  }

  destroy() {
    throw new Error("Method 'destroy()' must be implemented.");
  }
}