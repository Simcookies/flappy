import Keyboard from './KeyBoardState.js';
import {Status} from './Timer.js';

export function setupKeyboard(playerEnv, timer, level) {
  const input = new Keyboard();
  const bird = playerEnv.playerController.player;

  input.addMapping('Space', () => {
    if (timer.state.status === Status.READY) {
      timer.start();
    }
    bird.go.jump();
  });

  input.addMapping('KeyS', () => {
    if (timer.state.status === Status.RUNNING) {
      timer.pause();
      level.musics.pause.play();
    } else if (timer.state.status === Status.PAUSED) {
      timer.resume();
      level.musics.pause.play();
    }
  });

  input.addMapping('Enter', () => {
    if (bird.killable.dead) {
      window.location.reload();
    }
  });

  input.addMapping('Escape', () => {
    if (bird.killable.dead) {
      window.location.href = "index.html";
    }
  });

  return input;
}
