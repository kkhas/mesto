export class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(data) {
    data.forEach(item => {
      this._container.append(this._renderer(item));
  })
}

  addItem(element) {
    this._container.prepend(element)
  }
}