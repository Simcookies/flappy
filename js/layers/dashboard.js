import {WIN} from '../traits/PlayerController.js';

export function createDashboardLayer(font, playerEnv) {
  const LINE1 = font.size;
  const LINE2 = font.size * 2;

  return function drawDrashboard(context) {
    const {score, time} = playerEnv.playerController;
    const player = playerEnv.playerController.player;

    font.print('BIRD', context, 16, LINE1);
    font.print(score.toString().padStart(2, '0'), context, 32, LINE2);

    font.print('WORLD', context, 182, LINE1);
    font.print('1', context, 200, LINE2);

    font.print('TIME', context, 240, LINE1);
    font.print(time.toFixed().toString().padStart(3, '0'), context, 248, LINE2);

    if (player.killable.dead) {
      if (player.SIZE == 'l') {
        font.printLines('Oh! You failed!\nYou are too fat!\nYou need more trainning!\
          \nPress Enter to player again,\
           Esc to return.',
          context, 16, 80);
      } else if (player.SIZE == 'm') {
        font.printLines('Oh! You failed!\nGet used to control the chick.\
          \nPress Enter to player again,\
          \nEsc to return.',
          context, 16, 80);
      } else if (player.SIZE == 's') {
        font.printLines('Oh! You failed!\nYou are too slim!\nMaybe you need to eat more!\
          \nPress Enter to player again, Esc to return,\
          \nEsc to return.',
          context, 16, 80);
      }
    }

    if (playerEnv.playerController.score > WIN) {
      font.printLines('Conguration! You won!\nPress Enter to continue.', context, 30, 96);
    }
  };
};
