import {loadAudio} from '../loaders.js';

export function loadMusic() {
  return Promise.all([
    loadAudio('./audio/background-music.mp3'),
    loadAudio('./audio/got-point.wav'),
    loadAudio('./audio/jumping-sfx.wav')
  ]).then(([backgroundMusic, gotPoint, jumping])=> {
    backgroundMusic.loop = true;
    const audios = {
      backgroundMusic: backgroundMusic,
      gotPoint: gotPoint,
      jumping: jumping
    }
    return audios;
  });
}
