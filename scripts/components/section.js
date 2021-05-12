export class Section {
  //Свойство items — это массив данных, которые нужно добавить на страницу 
  //при инициализации класса. Свойство renderer — это функция, которая отвечает 
  //за создание и отрисовку данных на странице.  
  constructor({items, renderer}, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  //Содержит публичный метод, который отвечает за отрисовку всех элементов. 
  //Отрисовка каждого отдельного элемента должна осуществляться функцией renderer.
  renderItems() {
    this._renderedItems.forEach(item => {
      this._container.append(this._renderer(item));
      
  })
}

  //Содержит публичный метод addItem, который принимает DOM-элемент и добавляет его 
  //в контейнер.
  addItem(item) {
    this._container.append(item);
  //     // console.log(element)
  }
}