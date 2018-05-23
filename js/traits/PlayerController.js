import {Trait, Sides} from '../Entity.js';
import {Vec2} from '../math.js';
import {PIPE_RANGES} from '../pipeGenerate.js';

const eventWin = new Event('birdWin');
export const WIN = PIPE_RANGES.length;

export default class PlayerController extends Trait {
  constructor() {
    super('playerController');
    this.checkpoint = new Vec2(0, 0);
    this.entity = null;
    this.score = 0;
    this.time = 300;
  }

  setPlayer(entity) {
    this.player = entity;
  }

  update(entity, deltaTime, level) {
    if (!level.entities.has(this.player)) {
      this.player.killable.revive();
      this.player.vel.x = 60;
      this.player.pos.set(this.checkpoint.x, this.checkpoint.y);
      level.entities.add(this.player);
    } else {
      this.time -= deltaTime * 2;
      if(this.player.pos.x > PIPE_RANGES[0] * 16 + 32) {
        this.score++;
        level.musics.gotPoint.play();
        PIPE_RANGES.shift();
      }

      if (this.score > WIN) {
        document.dispatchEvent(eventWin);
      }
    }
  }
}
