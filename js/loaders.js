import SpriteSheet from './SpriteSheet.js';

export function loadImage(url) {
  return new Promise(reslove => {
    const image = new Image();
    image.addEventListener('load', () => {
      reslove(image);
    });
    image.src = url;
  });
}

export function loadAudio(url) {
  return new Promise(resolve => {
    const audio = new Audio();
    audio.addEventListener('canplaythrough', () => {
      resolve(audio);
    });
    audio.src = url;
  });
}

export function loadJSON(url) {
  return fetch(url)
  .then(r => r.json());
}

export function loadSpriteSheet(name) {
  return loadJSON(`./sprites/${name}.json`)
  .then(sheetSpec => Promise.all([
    sheetSpec,
    loadImage(sheetSpec.imageURL)
  ]))
  .then(([sheetSpec, image]) => {
    const sprites = new SpriteSheet(image);

    if (sheetSpec.tiles) {
      sheetSpec.tiles.forEach(tileSpec => {
        sprites.define(tileSpec.name, ...tileSpec.index);
      });
    }

    if (sheetSpec.frames) {
      sheetSpec.frames.forEach(frameSpec => {
        sprites.define(frameSpec.name, ...frameSpec.rect);
      });
    }

    return sprites;
  })
}
