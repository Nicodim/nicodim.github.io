'use strict';
(function () {
  var change = document.querySelector('.effects__list');
  var img = document.querySelector('.img-upload__preview');
  var small = document.querySelector('.scale__control--smaller');
  var big = document.querySelector('.scale__control--bigger');
  var bar = document.querySelector('.scale__control--value');
  var line = document.querySelector('.effect-level__line');
  var pin = document.querySelector('.effect-level__pin');
  var effectLevel = document.querySelector('.effect-level__value');
  var depth = document.querySelector('.effect-level__depth');
  var label = document.querySelector('.img-upload__effect-level');
  var imgLabel = document.querySelector('.img-upload__label');
  var effect = document.querySelector('.img-upload__effects');

  // делегирование кнопок

  window.oldValue = null;
  change.addEventListener('change', function (evt) {
    var target = evt.target;
    while (target !== document) {
      if (target.classList.contains('effects__radio')) {
        if (window.oldValue !== null) {
          img.classList.remove('effects__preview--' + window.oldValue);
        }
        window.oldValue = target.value;
        img.removeAttribute('style');
        bar.setAttribute('value', 100 + '%');
        if (target.value === 'none') {
          label.classList.add('hidden');
        } else {
          label.classList.remove('hidden');
          img.classList.add('effects__preview--' + target.value);
          pin.style.left = 100 + '%';
          depth.style.width = pin.style.left;
          return;
        }
      }

      target = target.parentNode;
    }
  });
  // что это??
  imgLabel.addEventListener('change', function () {
    label.classList.add('hidden');
    effect.classList.add('hidden');
  });
  // функция ограничения
  var getControlValue = function (current, min, max) {
    return min <= current && current <= max;
  };

  // Кнопка '+'
  small.addEventListener('click', function () {
    // шаг кнопки по клику
    var current = parseInt(bar.getAttribute('value'), 10) - 25;
    var getValue = getControlValue(current, 25, 100);
    if (!getValue) {
      current = 25;
    }
    bar.setAttribute('value', current + '%');
    // увеличение изображения
    // document.querySelector('.img-upload__preview').style.transform = 'scale (' + (current / 100) + ')';
    document.querySelector('.img-upload__preview').setAttribute('style', 'transform: scale(' + (current / 100) + ')');
    return +'%';
  });

  // кнопка '-'
  big.addEventListener('click', function () {
    // шаг кнопки по клику
    var current = parseInt(bar.getAttribute('value'), 10) + 25;
    var getValue = getControlValue(current, 25, 100);
    if (!getValue) {
      current = 100;
    }
    bar.setAttribute('value', current + '%');
    // уменьшение изображения
    // document.querySelector('.img-upload__preview').style.transform = 'scale (' + (current / 100) + ')';
    document.querySelector('.img-upload__preview').setAttribute('style', 'transform: scale(' + (current / 100) + ')');
    return +'%';
  });

  // функция получения координат
  function getCoords(element, evt) {
    var rect = element.getBoundingClientRect();
    return {x: evt.clientX - rect.left, y: evt.clientY - rect.top};
  }

  // изменение насыщенности
  function changeEffect(current) {

    var Effect = 'grayscale';
    var effectValue = current / 100;

    if (img.classList.contains('effects__preview--grayscale')) {
      Effect = 'grayscale';
    }

    if (img.classList.contains('effects__preview--sepia')) {
      Effect = 'sepia';
    }

    if (img.classList.contains('effects__preview--marvin')) {
      Effect = 'invert';
      effectValue = current + '%';
    }

    if (img.classList.contains('effects__preview--phobos')) {
      Effect = 'blur';
      effectValue = (current / 100 * 3) + 'px';
    }

    if (img.classList.contains('effects__preview--heat')) {
      Effect = 'brightness';
      effectValue = (current / 100 * 2 + 1);
    }

    img.style.filter = Effect + '(' + effectValue + ')';

    return;
  }
  // изменение положение пина и уровня эффекта
  document.querySelector('.effect-level__pin').addEventListener('mousedown', function (evt) {
    var target = evt.target;
    var shifts = getCoords(target, evt);

    document.onmousemove = function (ev) {
      var coords = getCoords(line, ev);
      var value = (coords.x - shifts.x) / line.offsetWidth * 100;
      if (value < 0) {
        value = 0;
      }
      if (value > 100) {
        value = 100;
      }
      target.style.left = Math.ceil(value) + '%';
      changeEffect(Math.ceil(value));
      effectLevel.value = Math.ceil(value) + '%';
      depth.style.width = Math.ceil(value) + '%';
    };

    document.onmouseup = function () {
      document.onmousemove = null;
      document.onmouseup = null;
      changeEffect(target.style.left);
      effectLevel.value = target.style.left;
    };
  });
})();
