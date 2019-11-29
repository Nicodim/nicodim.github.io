'use strict';
(function () {
  var upload = document.querySelector('.img-upload__overlay');
  var uploadOpen = document.getElementById('upload-file');
  var uploadClose = document.getElementById('upload-cancel');
  var label = document.querySelector('.img-upload__effect-level');
  var socialText = document.querySelector('.social__footer-text');
  var img = document.querySelector('.img-upload__preview');
  var imgUploadForm = document.querySelector('.img-upload__form'); // общая форма

  // Объявили обработчик ESC
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      upClose();
    }
  };

  // открытие и закрытия попапа.
  uploadOpen.addEventListener('change', function () {
    upload.classList.remove('hidden');
    label.classList.add('hidden');
    upload.value = '';
    if (window.oldValue !== null) {
      img.classList.remove('effects__preview--' + window.oldValue);
    }
    img.removeAttribute('style');
    document.addEventListener('keydown', onPopupEscPress);
  });

  var upClose = function () {
    upload.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  uploadClose.addEventListener('click', function () {
    upload.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  });

  // фокус на элементе
  document.addEventListener('focus', function (evt) {
    var target = evt.target;

    while (target !== document) {
      if (target.classList.contains('text__description')) {
        document.removeEventListener('keydown', onPopupEscPress);
      }
      target = target.parentNode;
    }
  }, true);

  document.addEventListener('blur', function (evt) {
    var target = evt.target;

    while (target !== document) {
      if (target.classList.contains('text__description')) {
        document.addEventListener('keydown', onPopupEscPress);
      }
      target = target.parentNode;
    }
  }, true);

  // валидация
  socialText.addEventListener('invalid', function () {
    if (socialText.validity.tooLong) {
      socialText.setCustomValidity('Комментарий не должен превышать 140-ка символов');
    } else {
      socialText.setCustomValidity('');
    }
  });

  // валидация хештегов
  var validate = function (evt) {
    var target = evt.target;

    while (target !== document) {
      if (target.classList.contains('text__hashtags')) {

        var textHashtags = document.querySelector('.text__hashtags');
        var tags = textHashtags.value.trim().split(' ');
        var arrayTags = [];
        target.style = 'outline: 2px solid rgba(242, 38, 19, 0.8);';

        textHashtags.setCustomValidity('');

        for (var i = 0; i < tags.length; i++) {

          if (tags[i].indexOf('#') !== 0) {
            textHashtags.setCustomValidity('хэш-тег начинается с символа # (решётка)');
            return;
          }

          if (tags[i].length === 1 && tags[i].indexOf('#') === 0) {
            textHashtags.setCustomValidity('хеш-тег не может состоять только из одной решётки');
            return;
          }

          if (tags[i].includes('#', 1)) {
            textHashtags.setCustomValidity('хэш-теги разделяются пробелами');
            return;
          }

          if (tags.length > 5) {
            textHashtags.setCustomValidity('нельзя указать больше пяти хэш-тегов');
            return;
          }

          if (tags[i].length > 20) {
            textHashtags.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку');
            return;
          }

          if (arrayTags.includes(tags[i])) {
            textHashtags.setCustomValidity('один и тот же хэш-тег не может быть использован дважды');
            return;
          }

          arrayTags.push(tags[i]);
        }

      }
      target = target.parentNode;
    }
  };

  document.addEventListener('input', validate);


  // получаем шаблон с сообщением об ошибке
  var errorTemplate = document.querySelector('#error') // шаблон
  .content
  .querySelector('.error'); // содержимое шаблона

  // получаем шаблон с сообщением об успешной отправке
  var successTemplate = document.querySelector('#success') // шаблон
  .content
  .querySelector('.success'); // содержимое шаблона


  var showMessage = function (template) {
    var message = template.cloneNode(true);
    var fragment = document.createDocumentFragment();
    fragment.appendChild(message);
    document.querySelector('main').appendChild(fragment);
  };


  var closeSuccess = function () {
    var success = document.querySelector('.success');
    success.remove();
    document.removeEventListener('keydown', onSuccessEscPress);
    document.removeEventListener('click', onSuccessClick);
  };

  var onSuccessEscPress = function (evt) {
    window.util.isEscEvent(evt, closeSuccess);
  };

  var onSuccessClick = function (evt) {
    var successInner = document.querySelector('.success__inner');
    var successTitle = successInner.querySelector('.success__title');

    if (evt.target !== successInner && evt.target !== successTitle) {
      closeSuccess();
    }
  };

  var closeError = function () {
    var error = document.querySelector('.error');
    error.remove();
    document.removeEventListener('keydown', onSuccessEscPress);
    document.removeEventListener('click', onSuccessClick);
  };

  var onErrorEscPress = function (evt) {
    window.util.isEscEvent(evt, closeError);
  };

  var onErrorClick = function () {
    closeError();
  };


  var uploadSuccess = function () {
    upClose();

    showMessage(successTemplate);
    document.addEventListener('keydown', onSuccessEscPress);
    document.addEventListener('click', onSuccessClick);
    imgUploadForm.reset();
  };

  var uploadError = function () {
    upload.classList.add('hidden');
    showMessage(errorTemplate);
    document.addEventListener('keydown', onErrorEscPress);
    document.addEventListener('click', onErrorClick);
    imgUploadForm.reset();
  };

  var onSubmitButtonClick = function (evt) {
    evt.preventDefault();
    var url = 'https://js.dump.academy/kekstagram';

    window.load(url, uploadSuccess, uploadError, 'POST', new FormData(imgUploadForm));
  };

  imgUploadForm.addEventListener('submit', onSubmitButtonClick);
})();
