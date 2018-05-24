import {Status} from '../Timer.js';

export function createMessageLayer(font, timer, playerEnv, level) {
  const LINE1 = 40;
  const LINE2 = 115;

  return function drawMessageLayer(context) {
    const {score, player} = playerEnv.playerController;

    if (timer.state.status === Status.READY) {
      font.printLines('The chick was lost in city.\n' +
      'Help him return home.\n' +
      'But please pay attention to\n' +
      'the PIPES.', context, 16, LINE1);
      font.printLines('Press SPACE to start game and\n' +
      'control the bird to fly.', context, 16, LINE2);
      font.print('Use SML to change chick\'s weight.', context, 10, LINE2 + 80);
    } else if (timer.state.status === Status.PAUSED){
      font.printLines('PAUSED!', context, 115, LINE2);
    }

    if (player.killable.dead) {
      if (player.SIZE == 'l') {
        font.printLines('Oh! You failed!\nYou are too fat!\nYou need more training!\
          \nPress Enter to player again.',
          context, 16, 80);
      } else if (player.SIZE == 'm') {
        font.printLines('Oh! You failed!\nGet used to control the chick.\
          \nPress Enter to player again.',
          context, 16, 80);
      } else if (player.SIZE == 's') {
        font.printLines('Oh! You failed!\nYou are too slim!\nMaybe you need to eat more!\
          \nPress Enter to player again.',
          context, 16, 80);
      }
    }

    if (score >= level.WIN) {
      font.printLines('Congratulations! You won!\n' +
      'The chick comes back home,\n' +
      'and so many chicks are\n' +
      'flying together!', context, 30, 80);
    }
  };
}
