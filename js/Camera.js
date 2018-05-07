import {Vec2} from './math.js';

export default class Camera {
  constructor() {
    this.pos = new Vec2(0, 16);
    this.size = new Vec2(286, 240);
  }
}
