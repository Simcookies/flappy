import Compositor from './Compositor.js';
import TileCollider from './TileCollider.js';
import EntityCollider from './EntityCollider.js';
import {Matrix} from './math.js';

export default class Level {
  constructor() {
    this.entities = new Set();
    this.comp = new Compositor();
    this.tiles = new Matrix();
    this.gravity = 400;

    this.tileCollider = null;
    this.entitiesCollisder = new EntityCollider(this.entities);
  }

  setCollosionGrid(matrix) {
    this.tileCollider = new TileCollider(matrix);
  }

  update(deltaTime) {
    this.entities.forEach(entity => {
      entity.update(deltaTime, this);
    });

    this.entities.forEach(entity => {
      this.entitiesCollisder.check(entity);
    });
  }
}
