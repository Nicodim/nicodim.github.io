'use strict';

(function () {

  var updatePictures = function (append) {
    window.renderPreview.addPictures(append);
  };

  var deletePictures = function () {
    window.renderPreview.removePictures();
  };

  var pictures = [];
  // Успех
  var successHandler = function (data) {
    pictures = data;
    updatePictures(pictures);
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  };
  // ошибка
  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var url = 'https://js.dump.academy/kekstagram/data';

  window.load(url, successHandler, errorHandler, 'GET');

  var renderPictures = window.debounce(function (allPictures) {
    deletePictures();
    updatePictures(allPictures);
  });

  var onButtonFilterClick = function (evt) {
    var target = evt.target;

    // делегирование кнопок
    while (target !== document) {
      if (target.classList.contains('picture')) {
        var id = target.getAttribute('data-id');
        window.full.addtoFull(window.renderPreview.pictures[id]);
      }
      if (['filter-popular', 'filter-new', 'filter-discussed'].indexOf(target.id) !== -1) {
        var current = document.querySelector('.img-filters__button--active');
        if (current) {
          current.classList.remove('img-filters__button--active');
        }
        target.classList.add('img-filters__button--active');

        var images = pictures.slice();
        if (target.id === 'filter-new') {
          var COUNT = 10;
          images = window.util.getUniqueElement(images, COUNT);
        }

        if (target.id === 'filter-discussed') {
          images.sort(function (a, b) {
            return b.comments.length - a.comments.length;
          });
        }

        renderPictures(images);
        return;
      }

      target = target.parentNode;
    }
  };

  document.addEventListener('click', onButtonFilterClick);
})();
