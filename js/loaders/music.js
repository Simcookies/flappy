import {loadAudio} from '../loaders.js';

export function loadMusic() {
  return Promise.all([
    loadAudio('./audio/background-music.mp3'),
    loadAudio('./audio/got-point.wav'),
    loadAudio('./audio/jumping-sfx.wav'),
    loadAudio('./audio/pause.wav'),
    loadAudio('./audio/game-over.wav'),
    loadAudio('./audio/crash.wav')
  ]).then(([backgroundMusic, gotPoint, jumping, pause, gameOver, crash])=> {
    backgroundMusic.loop = true;
    const audios = {
      backgroundMusic: backgroundMusic,
      gotPoint: gotPoint,
      jumping: jumping,
      pause: pause,
      gameOver: gameOver,
      crash: crash
    }
    return audios;
  });
}
