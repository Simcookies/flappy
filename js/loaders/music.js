import {loadAudio} from '../loaders.js';

export function loadMusic() {
  return Promise.all([
    loadAudio('./audio/background-music.mp3'),
    loadAudio('./audio/got-point.wav'),
    loadAudio('./audio/jumping-sfx.wav'),
    loadAudio('./audio/pause.wav'),
    loadAudio('./audio/game-over.wav')
  ]).then(([backgroundMusic, gotPoint, jumping, pause, gameOver])=> {
    backgroundMusic.loop = true;
    const audios = {
      backgroundMusic: backgroundMusic,
      gotPoint: gotPoint,
      jumping: jumping,
      pause: pause,
      gameOver: gameOver
    }
    return audios;
  });
}
