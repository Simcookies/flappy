import BoundingBox from './BoundingBox.js';
import {Vec2} from './math.js';

export const Sides = {
  TOP: Symbol('top'),
  BOTTOM: Symbol('bottom'),
  RIGHT: Symbol('right'),
  LEFT: Symbol('left'),
}

export class Trait {
  constructor(name) {
    this.NAME = name;
  }

  collides(us ,them) {}

  obstruct() {}

  update() {}
}

export default class Entity {
  constructor() {
    this.pos = new Vec2(0, 0);
    this.vel = new Vec2(0, 0);
    this.size = new Vec2(0, 0);

    this.bounds = new BoundingBox(this.pos, this.size);
    this.traits = [];
  }

  addTrait(trait) {
    this.traits.push(trait);
    this[trait.NAME] = trait;
  }

  collides(canditate) {
    this.traits.forEach(trait => {
      trait.collides(this, canditate);
    });
  }

  obstruct(side, match) {
    this.traits.forEach(trait => {
      trait.obstruct(this, side, match);
    });
  }

  draw() {}

  update(deltaTime, level) {
    this.traits.forEach(trait => {
      trait.update(this, deltaTime, level);
    });
  }
}
