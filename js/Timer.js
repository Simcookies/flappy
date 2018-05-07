// TODO: wait for understanding
export default class Timer {
  constructor(deltaTime = 1/60) {
    let accumulatedTime = 0;
    let lastTime = 0;
    this.stop = false;
    this.updateProxy = (time) => {
      accumulatedTime += (time - lastTime) / 1000;
      while (accumulatedTime > deltaTime) {
        this.update(deltaTime);
        accumulatedTime -= deltaTime;
      }
      lastTime = time;
      this.enqueue();
    };
  }

  enqueue() {
    if (!this.stop) {
      requestAnimationFrame(this.updateProxy);
    }
  }

  start() {
    this.enqueue();
  }

  pause() {
    this.stop = true;
  }

  resume() {
    this.stop = false;
    this.enqueue();
  }
}
