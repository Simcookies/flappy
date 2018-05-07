import {Trait, Sides} from '../Entity.js';

const eventDead = new Event('birdDead');

export default class Killable extends Trait {
  constructor() {
    super('killable');
    this.dead = false;
    this.deadTime = 0;
    this.removeAfter = 0.1;
  }

  kill() {
    this.dead = true;
  }

  revive() {
    this.dead = false;
    this.deadTime = 0;
  }

  update(entity, deltaTime, level) {
    if (entity.killable.dead) {
      this.deadTime += deltaTime;
      if (this.deadTime > this.removeAfter) {
        level.entities.delete(entity);
        document.dispatchEvent(eventDead);
      }
    }
  }
}
