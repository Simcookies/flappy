export const PIPE_RANGES = [];

export function pipeGenerate() {
  const rangesDown = [];
  const rangesUp = [];
  const rangesVert = [];

  for (let x = 15; x < 100; x += 9) {
    PIPE_RANGES.push(x);

    const edgeUp = 2 + Math.floor(Math.random() * 4);
    const edgeDown = edgeUp + Math.floor(Math.random() * 2) + 7;
    rangesDown.push([x, edgeDown]);
    rangesUp.push([x, edgeUp]);

    for (let index = 0; index <= edgeUp; index++) {
      rangesVert.push([x, index]);
    }
    for (let index = edgeDown; index <= 15; index++) {
      rangesVert.push([x, index]);
    }
  }

  const tileDown = {
    pattern: "pipe-insert",
    type: "pipe",
    ranges: rangesDown
  };

  const tileUp = {
    pattern: "pipe-insert-mirror",
    type: "pipe",
    ranges: rangesUp
  };

  const tileVert = {
    pattern: "pipe-vert",
    type: "pipe",
    ranges: rangesVert
  };

  return {tiles: [tileDown, tileUp, tileVert]};
}
