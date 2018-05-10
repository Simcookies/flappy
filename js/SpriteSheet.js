export default class SpriteSheet {
  constructor(image, width = 16, height = 16) {
    this.image = image;
    this.width = width;
    this.height = height;
    this.tiles = new Map();
  }

  define(name, x, y, width, height, sWidth, sHeight) {
    const buffers = [false, true].map(flip => {
      const buffer = document.createElement('canvas');
      buffer.width = sWidth || width;
      buffer.height = sHeight || height;
      const context = buffer.getContext('2d');

      if (flip) {
        context.scale(1, -1);
        context.translate(0, -height)
      }

      context.drawImage(
        this.image,
        x, y,
        width, height,
        0, 0,
        sWidth || width, sHeight || height
      );
      return buffer;
    });
    this.tiles.set(name, buffers)
  }

  defineTile(name, x, y) {
    this.define(name, x * this.width, y * this.height, this.width, this.height);
  }

  draw(name, context, x, y, flip = false) {
    const buffer = this.tiles.get(name)[flip ? 1 : 0];
    context.drawImage(buffer, x, y);
  }

  drawTile(name, context, x, y, flip = false) {
    this.draw(name, context, x * this.width, y * this.height, flip);
  }
}
