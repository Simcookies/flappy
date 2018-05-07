import {Trait} from '../Entity.js';

export default class Go extends Trait {
  constructor() {
    super('go');
    this.ready = false;
    this.time = 0;
  }

  jump() {
    this.ready = true;
  }

  update(entity, deltaTime) {
    if (this.ready) {
      entity.vel.y = -120;
      this.ready = false;
    }
  }
}
