import Entity from '../Entity.js';
import Go from '../traits/Go.js';
import Physics from '../traits/Physics.js';
import Solid from '../traits/Solid.js';
import Killable from '../traits/Killable.js';
import {loadSpriteSheet} from '../loaders.js';

export function loadBird(size) {
  return loadSpriteSheet('bird')
  .then(sprite => createBirdFactory(sprite, size));
}

function createBirdFactory(sprite) {

  const size = localStorage.getItem('birdSize') || 'm';
  function drawBird(context) {
    sprite.draw(`idle-${size}`, context ,0, 0);
  }

  const tile = sprite.tiles.get(`idle-${size}`)[0];
  const height = tile.height;
  const width = tile.width;

  return function createBird() {
    const bird = new Entity();
    bird.size.set(width, height);
    bird.vel.x = 60;
    bird.vel.y = -120;

    bird.addTrait(new Physics());
    bird.addTrait(new Solid());
    bird.addTrait(new Go());
    bird.addTrait(new Killable());
    bird.draw = drawBird;

    return bird;
  }
}
