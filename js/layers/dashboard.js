export function createDashboardLayer(font, playerEnv) {
  const LINE1 = font.size;
  const LINE2 = font.size * 2;

  return function drawDrashboard(context) {
    const {score, time} = playerEnv.playerController;

    font.print('BIRD', context, 16, LINE1);
    font.print(score.toString().padStart(2, '0'), context, 32, LINE2);

    font.print('WORLD', context, 182, LINE1);
    font.print('1', context, 200, LINE2);

    font.print('TIME', context, 240, LINE1);
    font.print(time.toFixed().toString().padStart(3, '0'), context, 248, LINE2);
  };
};
