export default class Keyboard {
  constructor() {
    // Holds the callback functions for a key code.
    this.keyMap = new Map();
  }

  addMapping(code, callback) {
    this.keyMap.set(code, callback);
  }

  handleEvent(event) {
    const {code, type} = event;
    if(!this.keyMap.has(code)) {
      // Did not have mapped.
      return;
    }

    event.preventDefault();
    this.keyMap.get(code)();
  }

  listenTo(window) {
    window.addEventListener('keydown', event => {
      this.handleEvent(event);
    });
  }
}
