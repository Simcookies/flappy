import Keyboard from './KeyBoardState.js';
import {WIN} from './traits/PlayerController.js';

export function setupKeyboard(playerEnv, timer) {
  const input = new Keyboard();
  const bird = playerEnv.playerController.player;

  input.addMapping('Space', keyState => {
    bird.go.jump();
  });

  input.addMapping('KeyS', keyState => {
    timer.pause();
  });

  input.addMapping('KeyD', keyState => {
    timer.resume();
  });

  input.addMapping('Enter', keyState => {
    if (bird.killable.dead) {
      window.location.reload();
    }

    if (playerEnv.playerController.score > WIN) {
      window.location.href = "win.html"
    }
  });

  input.addMapping('Escape', keyState => {
    if (bird.killable.dead) {
      window.location.href = "index.html";
    }
  });

  return input;
}

export function setupBeginKey() {
  const input = new Keyboard();

  input.addMapping('Space', keyState => {
    window.location.href = 'game.html';
  });

  return input;
}
