import {Trait, Sides} from '../Entity.js';
import {PIPE_RANGES} from '../pipeGenerate.js';

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
    this.crashed = false;
  }

  hit() {
    this.crashed = true;
  }

  revive() {
    this.dead = false;
    this.crashed = false;
    this.killed = false;
    this.deadTime = 0;
  }

  update(entity, deltaTime, level) {
    if (this.dead) {
      this.deadTime += deltaTime;
      if (this.deadTime > this.removeAfter) {
        level.entities.delete(entity);
        level.pipeRanges = PIPE_RANGES.slice(0);
        document.dispatchEvent(eventDead);
      }
    }

    if (this.crashed) {
      if (!this.musicPlayed) {
        level.musics.crash.play();
        this.musicPlayed = true;
      }
      entity.controllable = false;
    }

    if (this.killed) {
      entity.controllable = true;
      this.musicPlayed = false;
    }
  }
}
