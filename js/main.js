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
import {loadMusic} from './loaders/music.js';

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

  const [entityFactory, font, musics] = await Promise.all([
    loadEntities(),
    loadFont(),
    loadMusic()
  ]);

  const loadLevel = await createLevelLoader(entityFactory);
  const level = await loadLevel('1');

  const bird = entityFactory.bird();
  const playerEnv = createPlayerEnv(bird);
  level.entities.add(playerEnv);
  level.musics = musics;

  const camera = new Camera();

  // setupMouseControl(canvas, bird, camera);
  //
  // level.comp.layers.push(
  //   createCollisionLayer(level),
  //   createCameraLayer(camera),
  // );

  level.comp.layers.push(createDashboardLayer(font, playerEnv));

  const timer = new Timer(1/60,bird);
  const input = setupKeyboard(playerEnv, timer);
  input.listenTo(window);

  timer.update = function update(deltaTime) {
    level.update(deltaTime);
    camera.pos.x = Math.max(0, bird.pos.x - 143);
    level.comp.draw(context, camera);
  };

  document.addEventListener('birdDead', e => {
    timer.pause();
    level.musics.backgroundMusic.pause();
  });

  document.addEventListener('birdWin', e => {
    timer.pause();
    level.musics.backgroundMusic.pause();
  });

  timer.start();
  level.musics.backgroundMusic.play();
}

window.onload = function() {
  const canvas = document.getElementById('screen');
  main(canvas);
}
