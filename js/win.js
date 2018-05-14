import {loadFont} from './loaders/font.js';
import {loadSpriteSheet} from './loaders.js';

async function main(canvas) {
  const context = canvas.getContext('2d');
  const [font, sprites, birdSprite] = await Promise.all([
    loadFont(),
    loadSpriteSheet('world'),
    loadSpriteSheet('bird')
  ]);

  sprites.draw("background", context, 0, 0);
  sprites.draw("background", context, 143, 0);

  for (let x = 0; x < 10; x++) {
    const x = Math.floor(Math.random() * 270);
    const y = Math.floor(Math.random() * 120) + 100;
    const size = ['s', 'm', 'l'][Math.floor(Math.random()*3)];
    birdSprite.draw(`idle-${size}`, context, x, y);
  }

  const LINE1 = 40;
  font.print('Congurations!', context, 90, LINE1);
  font.print('The chick comes back home,', context, 16, LINE1 + 16);
  font.print('and so many chicks are', context, 16, LINE1 + 32);
  font.print('flying together!', context, 16, LINE1 + 48);
}

const canvas = document.getElementById('dashboard');
main(canvas);
