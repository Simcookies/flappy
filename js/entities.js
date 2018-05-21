import {loadBird} from './entities/Bird.js';

export function loadEntities() {
  const entityFactories = {};

  function addAs(name) {
    return factory => entityFactories[name] = factory;
  }

  return Promise.all([
    loadBird().then(addAs('bird')),
  ])
  .then(() => entityFactories);
}
