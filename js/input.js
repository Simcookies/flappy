import Keyboard from './KeyboardState.js';

export function setupKeyboard(bird, timer) {
  const input = new Keyboard();

  input.addMapping('Space', keyState => {
    bird.go.jump();
  });

  return input;
}
