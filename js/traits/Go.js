import {Trait} from '../Entity.js';

export default class Go extends Trait {
  constructor() {
    super('go');
    this.ready = false;
    this.time = 0;
    this.sxf = new Audio('./audio/jumping-sfx.wav');
  }

  jump() {
    this.ready = true;
  }

  update(entity, deltaTime, level) {
    if (this.ready) {
      entity.vel.y = -120;
      level.musics.jumping.play();
      this.ready = false;
    }
  }
}
