import {loadBird} from './entities/Bird.js';

export function loadEntities() {
  const entityFactories = {};

  function addAs(name) {
    return factory => entityFactories[name] = factory;
  }

  const size = localStorage.getItem('birdSize') || 'm';

  return Promise.all([
    loadBird(size).then(addAs('bird')),
  ])
  .then(() => entityFactories);
}
