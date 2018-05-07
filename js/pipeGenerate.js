export const PIPE_RANGES = [];

export function pipeGenerate() {
  const rangesDown = [];
  const rangesUp = [];
  const rangesVert = [];

  for (let x = 15; x < 200; x += 9) {
    PIPE_RANGES.push(x);

    const edgeUp = 2 + Math.floor(Math.random() * 4);
    const edgeDown = edgeUp + 8;
    rangesDown.push([x, edgeDown]);
    rangesUp.push([x, edgeUp]);

    for (let index = 0; index <= edgeUp; index++) {
      rangesVert.push([x, index]);
    }
    for (let index = edgeDown; index <= 16; index++) {
      rangesVert.push([x, index]);
    }
  }

  const tileDown = {
    pattern: "pipe-insert",
    type: "ground",
    ranges: rangesDown
  };

  const tileUp = {
    pattern: "pipe-insert-mirror",
    type: "ground",
    ranges: rangesUp
  };

  const tileVert = {
    pattern: "pipe-vert",
    type: "ground",
    ranges: rangesVert
  };

  return {tiles: [tileDown, tileUp, tileVert]};
}
