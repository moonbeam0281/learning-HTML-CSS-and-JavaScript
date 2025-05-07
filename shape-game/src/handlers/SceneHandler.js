import { setupLighting } from '../environment/Lighting.js';

export class SceneHandler {
  constructor(scene, map) {
    scene.add(map.mesh);
    console.log('Created map');
    setupLighting(scene);
    console.log('Added lighting to scene');
  }

  updateMap(scene, map)
  {

  }
}
