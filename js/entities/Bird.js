import Entity from '../Entity.js';
import Go from '../traits/Go.js';
import Physics from '../traits/Physics.js';
import Solid from '../traits/Solid.js';
import Killable from '../traits/Killable.js';
import {loadSpriteSheet} from '../loaders.js';

export function loadBird() {
  return loadSpriteSheet('bird')
  .then(createBirdFactory);
}

function createBirdFactory(sprite) {

  function drawBird(context) {
    sprite.draw('idle', context ,0, 0);
  }

  return function createBird() {
    const bird = new Entity();
    bird.size.set(16, 12);
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
