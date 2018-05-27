export const Status = {
  READY: Symbol('ready'),
  RUNNING: Symbol('running'),
  STOPED: Symbol('stoped'),
  PAUSED: Symbol('paused'),
  NONE: Symbol('none')
}

const Actions = {
  STARTED: Symbol('started'),
  RESTARTED: Symbol('restarted'),
  STOPED: Symbol('stoped'),
  PAUSED: Symbol('paused'),
  NONE: Symbol('none')
}

class State {
  constructor(status = Status.NONE, action = Actions.NONE) {
    this.setStatus(status);
    this.setAction(action);
  }

  set(status, action) {
    this.setStatus(status);
    this.setAction(action);
  }

  setStatus(status) {
    this.status = status;
  }

  setAction(action) {
    this.action = action;
  }
}

export default class Timer {
  constructor(deltaTime = 1/60, level) {
    this.deltaTime = deltaTime;
    let accumulatedTime = 0;
    let lastTime = 0;

    this.state = new State();
    this.musics = level.musics;

    this.updateProxy = (time) => {
      if (this.state.action === Actions.RESTARTED ||
          this.state.action === Actions.STARTED) {
        // Set restarted flag to check whether it is resumed.
        // Set started flag to check whether it is started.
        lastTime = time;
        this.state.setAction(Actions.NONE);
      }
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
    if (this.state.status === Status.RUNNING) {
      requestAnimationFrame(this.updateProxy);
    }
  }

  getReady() {
    this.state.setStatus(Status.READY);
    this.update(this.deltaTime);
  }

  start() {
    this.state.set(Status.RUNNING, Actions.STARTED);
    this.musics.backgroundMusic.play();
    this.enqueue();
  }

  pause() {
    this.state.set(Status.PAUSED, Actions.PAUSED);
    this.musics.backgroundMusic.pause();
  }

  resume() {
    this.state.set(Status.RUNNING, Actions.RESTARTED);
    this.musics.backgroundMusic.play();
    this.enqueue();
  }

  stop() {
    this.state.set(Status.STOPED, Actions.STOPED);
    this.musics.backgroundMusic.pause();
  }
}
