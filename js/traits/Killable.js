import {Trait, Sides} from '../Entity.js';

const eventDead = new Event('birdDead');

export default class Killable extends Trait {
  constructor() {
    super('killable');
    this.dead = false;
    this.deadTime = 0;
    this.removeAfter = 0.1;
    this.crashed = false;
    this.killed = false;
    this.musicPlayed = false;
  }

  kill() {
    this.dead = true;
    this.killed = true;
  }

  hit() {
    this.crashed = true;
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

    if (entity.killable.crashed) {
      if (!this.musicPlayed) {
        level.musics.crash.play();
        this.musicPlayed = true;
      }
      entity.controllable = false;
    }

    if (this.killed) {
      entity.controllable = true;
    }
  }
}
