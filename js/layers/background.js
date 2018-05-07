import TileResolver from '../TileResolver.js';

const backWidth = 143;

export function createPipeLayer(tiles, sprites) {
  const resolver = new TileResolver(tiles);

  const buffer = document.createElement('canvas');
  buffer.width = backWidth * 2 + 16;
  buffer.height = 258;
  const context = buffer.getContext('2d');

  function redraw(startIndex, endIndex) {
    context.clearRect(0, 0, buffer.width, buffer.height);

    for (let x = startIndex; x <= endIndex; x++) {
      const col = tiles.grid[x];
      if (col) {
        col.forEach((tile, y) => {
          if (tile.name !== 'ground' && tile.name !=='background') {
            sprites.drawTile(
              tile.name,
              context,
              x - startIndex, y
            );
          }
        });
      }
    }
  }

  return function drawPipeLayer(context, camera) {
    const drawWith = resolver.toIndex(camera.size.x);
    const drawFrom = resolver.toIndex(camera.pos.x);
    const drawTo = drawFrom + drawWith;
    redraw(drawFrom, drawTo);

    context.drawImage(
      buffer,
      -camera.pos.x % 16,
      -camera.pos.y
    );
  }
}

export function createBackgroundLayer(backgrounds, tiles, sprites) {
  const resolver = new TileResolver(tiles);

  const buffer = document.createElement('canvas');
  buffer.width = backWidth * 3;
  buffer.height = 258;
  const context = buffer.getContext('2d');

  function redraw() {
    context.clearRect(0, 0, buffer.width, buffer.height);

    for (let x = 0; x < 3; x++) {
      sprites.draw("background", context, backWidth * x, 0);
    }
  }

  return function drawBackgroundLayer(context, camera) {
    redraw();

    context.drawImage(
      buffer,
      -camera.pos.x % backWidth,
      -camera.pos.y
    );
  }
}
