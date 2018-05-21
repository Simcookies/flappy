import {loadFont} from './loaders/font.js';
import {loadSpriteSheet} from './loaders.js';
import {setupBeginKey} from './input.js';

function createDrawBird(context, sprites, x, y) {
  const birdBuffer = document.createElement('canvas');
  birdBuffer.width = 32;
  birdBuffer.height = 32;
  const birdContext = birdBuffer.getContext('2d');

  return function drawBird(size = 'm') {
    birdContext.clearRect(0, 0, birdBuffer.width, birdBuffer.height)
    sprites.draw(`idle-${size}`, birdContext, 0, 0);
    context.drawImage(birdBuffer, x, y);
  };
}

// async function main(canvas) {
//   const context = canvas.getContext('2d');
//   const [font, sprites, birdSprite] = await Promise.all([
//     loadFont(),
//     loadSpriteSheet('world'),
//     loadSpriteSheet('bird')
//   ]);
//
//   drawDashbord(context, sprites, font);
//   const drawBird = createDrawBird(context, birdSprite, 16, 160);
//   drawBird();
//   localStorage.setItem('birdSize', 'm');
//
//   const input = setupBeginKey();
//
//   input.addMapping('KeyS', keyState => {
//     drawDashbord(context, sprites, font);
//     drawBird('s');
//     localStorage.setItem('birdSize', 's');
//   });
//   input.addMapping('KeyM', keyState => {
//     drawDashbord(context, sprites, font);
//     drawBird('m');
//     localStorage.setItem('birdSize', 'm');
//   });
//   input.addMapping('KeyL', keyState => {
//     drawDashbord(context, sprites, font);
//     drawBird('l');
//     localStorage.setItem('birdSize', 'l');
//   });
//   input.listenTo(window);
// }
//
// const canvas = document.getElementById('dashboard');
// main(canvas);
