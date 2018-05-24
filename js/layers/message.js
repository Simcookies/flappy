import {Status} from '../Timer.js';

export function createMessageLayer(font, timer, playerEnv, level) {
  const LINE1 = 40;
  const LINE2 = 205;

  return function drawMessageLayer(context) {
    const {score, player} = playerEnv.playerController;

    if (timer.state.status === Status.READY) {
      font.printLines('You ara a chick, and you are\n' +
      'lost in city. Return home.\n' +
      'But please watch out for\n' +
      'the PIPES.', context, 16, LINE1);
      font.printLines('Press SPACE to start game and fly.', context, 10, LINE2);
    } else if (timer.state.status === Status.PAUSED){
      font.printLines('PAUSED!', context, 115, LINE2);
    }

    if (player.killable.dead) {
      if (player.SIZE == 'l') {
        font.printLines('Oh! You failed!\nYou are too fat!\nYou need more training!\
          \nPress Enter to play again.',
          context, 16, 80);
      } else if (player.SIZE == 'm') {
        font.printLines('Oh! You failed!\nGet used to controlling the chick.\
          \nPress Enter to play again.',
          context, 16, 80);
      } else if (player.SIZE == 's') {
        font.printLines('Oh! You failed!\nYou are too slim!\nMaybe you need to eat more!\
          \nPress Enter to play again.',
          context, 16, 80);
      }
    }

    if (score >= level.WIN) {
      font.printLines('Congratulations! You won!\n' +
      'You came back home, and your\n' +
      'friends ara all happy to see\n' +
      'you!', context, 30, 80);
    }
  };
}
