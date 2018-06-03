import Entity from './Entity.js';
import PlayerController from './traits/PlayerController.js';
import Level from './Level.js';
import Camera from './Camera.js';
import Timer, {Status} from './Timer.js';
import {loadEntities} from './entities.js';
import {createCameraLayer} from './layers/camera.js';
import {createCollisionLayer} from './layers/collision.js';
import {createDashboardLayer} from './layers/dashboard.js';
import {createMessageLayer} from './layers/message.js';
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

async function main(canvas, musics) {
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
  level.musics = musics;

  const camera = new Camera();

  // setupMouseControl(canvas, bird, camera);
  //
  // level.comp.layers.push(
  //   createCollisionLayer(level),
  //   createCameraLayer(camera),
  // );

  const timer = new Timer(1/60, level);
  const input = setupKeyboard(playerEnv, timer, level);
  input.listenTo(window);

  level.comp.layers.push(createDashboardLayer(font, playerEnv));
  level.comp.layers.push(createMessageLayer(font, timer, playerEnv, level));

  timer.update = function update(deltaTime) {
    level.update(deltaTime);
    camera.pos.x = Math.max(0, bird.pos.x - 143);
    level.comp.draw(context, camera);
  };

  document.addEventListener('birdDead', e => {
    timer.stop();
    level.musics.gameOver.play();
  });

  document.addEventListener('birdWin', e => {
    timer.stop();
  });
  return timer;
}

export function loadGame() {
  loadMusic().then((musics) => {
    const canvas = document.getElementById('screen');
    return main(canvas, musics);
  })
  .then((timer) => {
    timer.getReady();
  });
}
