'use strict';
(function () {
  // Генерируем шаблон фотографий
  function renderUserPictures(picture, id) {
    var picturesTemplate = document.querySelector('#picture')
    .content.querySelector('.picture');

    var clonePicture = picturesTemplate.cloneNode(true);

    clonePicture.querySelector('.picture__img').src = picture.url;
    clonePicture.querySelector('.picture__likes').textContent = picture.likes;
    clonePicture.querySelector('.picture__comments').textContent = picture.comments.length;
    clonePicture.setAttribute('data-id', id);
    return clonePicture;
  }


  // Добавляем фотки в ДОМ
  window.renderPreview = {
    pictures: [],
    addPictures: function (array) {
      window.renderPreview.pictures = array;
      var fragment = document.createDocumentFragment();
      var picturesContainer = document.querySelector('.pictures');

      for (var i = 0; i < array.length; i++) {

        fragment.appendChild(renderUserPictures(array[i], i));
      }

      picturesContainer.appendChild(fragment);

    },

    removePictures: function () {
      var pictures = document.querySelectorAll('.picture');
      pictures.forEach(function (node) {
        node.remove();
      });
    }

  };

})();
