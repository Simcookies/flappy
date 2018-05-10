import Entity from './Entity.js';
import PlayerController from './traits/PlayerController.js';
import Level from './Level.js';
import Camera from './Camera.js';
import Timer from './Timer.js';
import {loadEntities} from './entities.js';
import {createCameraLayer} from './layers/camera.js';
import {createCollisionLayer} from './layers/collision.js';
import {createDashboardLayer} from './layers/dashboard.js';
import {setupKeyboard} from './input.js';
import {setupMouseControl} from './debug.js';
import {createLevelLoader} from './loaders/level.js';
import {loadFont} from './loaders/font.js';

function createPlayerEnv(playerEntity) {
  const playerEnv = new Entity();
  const playerControl = new PlayerController();
  playerControl.checkpoint.set(20, 120);
  playerControl.setPlayer(playerEntity);
  playerEnv.addTrait(playerControl);
  return playerEnv;
}

async function main(canvas) {
  const context = canvas.getContext('2d');

  const [entityFactory, font] = await Promise.all([
    loadEntities(),
    loadFont()
  ]);

  const loadLevel = await createLevelLoader(entityFactory);
  const level = await loadLevel('1');

  const bird = entityFactory.bird();
  const playerEnv = createPlayerEnv(bird);
  level.entities.add(playerEnv);

  const camera = new Camera();

  // setupMouseControl(canvas, bird, camera);
  //
  // level.comp.layers.push(
  //   createCollisionLayer(level),
  //   createCameraLayer(camera),
  // );

  level.comp.layers.push(createDashboardLayer(font, playerEnv));

  const timer = new Timer(1/60);
  const input = setupKeyboard(bird, timer);
  input.listenTo(window);

  timer.update = function update(deltaTime) {
    level.update(deltaTime);
    camera.pos.x = Math.max(0, bird.pos.x - 143);
    level.comp.draw(context, camera);
  };

  document.addEventListener('birdDead', e => {
    timer.pause();
    if (bird.SIZE == 'l') {
      alert('Oh! You failed!\nYou are too fat!\nYou need more trainning!');
    } else if (bird.SIZE == 'm') {
      alert('Oh! You failed!\nGet used to control the chick.');
    } else if (bird.SIZE == 's') {
      alert('Oh! You failed!\nYou are too slim!\nMaybe you need eat more!')
    }

    if (confirm('Do you want to try again?')) {
      window.location.reload();
    } else {
      timer.pause();
      window.location.href = "index.html";
    }
  });

  document.addEventListener('birdWin', e => {
    timer.pause();
    window.location.href = "win.html";
  });

  timer.start();
}

window.onload = function() {
  const canvas = document.getElementById('screen');
  main(canvas);
}
