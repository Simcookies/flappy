import {loadImage, loadSpriteSheet, loadAudio} from './loaders.js';
import {loadFont} from './loaders/font.js';
import {loadGame} from './main.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

const SCREEN_WIDTH = 286;
const SCREEN_HEIGHT = 240;
Promise.all([
  loadImage('./img/index_background.png'),
  loadImage('./img/monster.png'),
  loadSpriteSheet('bird'),
  loadFont(),
  loadAudio('./audio/indexBG.wav'),
  loadAudio('./audio/angry.wav')
])
.then(([backImage, monster, sprite, font, indexBG, angrayWav]) => {
  const buffer = document.createElement('canvas');
  buffer.width = SCREEN_WIDTH;
  buffer.height = SCREEN_HEIGHT;
  const bufferContext = buffer.getContext('2d');

  let y = 16;
  [
    'Monster can not finish his',
    'homework. So he is very angry',
    'now. His classmate, small chick,',
    'is going through him happily.'
  ].forEach(text => {
    font.print(text, bufferContext, 20, y);
    y += 20;
  });

  let scrollY = SCREEN_HEIGHT;
  (function updateBackImage() {
    context.drawImage(backImage, 0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    context.drawImage(monster, SCREEN_WIDTH - 100, SCREEN_HEIGHT - 100, 100, 100);
    context.drawImage(buffer, 0, scrollY--, SCREEN_WIDTH, SCREEN_HEIGHT);
    if (scrollY < -y) {
      document.dispatchEvent(new Event('firstEnd'));
      return false;
    }
    setTimeout(updateBackImage, 30);
  })();

  document.addEventListener('firstEnd', (ev) => {
    let positionX = 20;
    let positionY = 100;
    indexBG.play();
    (function updateChick() {
      context.drawImage(backImage, 0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
      context.drawImage(monster, SCREEN_WIDTH - 100, SCREEN_HEIGHT - 100, 100, 100);
      positionX += 2;
      positionY += Math.sin(positionX / 20) * 2.5;
      sprite.draw('idle-l', context, positionX, positionY);
      if (positionX > SCREEN_WIDTH * 2 / 3) {
        document.dispatchEvent(new Event('chickShowed'));
        return false;
      }
      setTimeout(updateChick, 20);
    })();
  });

  document.addEventListener('chickShowed', (ev) => {
    let size = 100;
    let positionX = SCREEN_WIDTH - size;
    let positionY = SCREEN_HEIGHT - size;
    angrayWav.play();
    (function updateChickFly() {
      context.drawImage(backImage, 0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
      context.drawImage(monster, positionX, positionY, size++, size++);
      sprite.draw('idle-l', context, positionX+size*0.4, positionY+size*0.6);
      positionX -= 2;
      positionY -= 2;
      if (size > 200) {
        document.dispatchEvent(new Event('monsterBigger'));
        return false;
      }
      setTimeout(updateChickFly, 30);
    })();
  });

  document.addEventListener('monsterBigger', (ev) => {
    context.drawImage(backImage, 0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    context.drawImage(monster, 84, 38, 201, 201);
    sprite.draw('idle-l', context, 165, 159);

    let start = 0;
    (function updateBack() {
      let imgData = context.getImageData(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
      for (let i = 0; i < imgData.data.length; i +=4) {
        imgData.data[i]--;
        imgData.data[i+1]--;
        imgData.data[i+2]--;
      }
      context.putImageData(imgData, 0, 0);
      let y = 36;
      [
        'Monster becomes angrier!',
        'Monster: "You will be punished!',
        'You can not leave until I ',
        'forgive you!"'
      ].forEach(text => {
        font.print(text, context, 20, y);
        y += 20;
      });

      if (start++ > 250) {
        document.dispatchEvent(new Event('subLoaded'));
        return false;
      }
      setTimeout(updateBack, 30);
    })()
  });

  document.addEventListener('subLoaded', (ev) => {
    let y = 150;
    [
      'The small chick was closed by',
      'Monster. However, he found a',
      'exit. Can he return home?'
    ].forEach(text => {
      font.print(text, context, 20, y);
      y += 20;
    });

    setTimeout(loadGame, 6000);
  });

  document.addEventListener('gameWin', (ev) => {
    indexBG.play();
    for (let i = 0; i < 10; i++) {
      let positionX = Math.floor(Math.random() * SCREEN_WIDTH);
      let positionY = Math.floor(Math.random() * SCREEN_HEIGHT);
      sprite.draw('idle-l', context, positionX, positionY);
    }
  });
});
