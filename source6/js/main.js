'use strict';
var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var url = function (n) {
  return 'photos/' + n + '.jpg';
};

var likes = function (min, max) {
  var random = min - 0.5 + Math.random() * (max - min + 1);
  random = Math.round(random);
  return random;
};

var getRandomComment = function (comment) {
  var randomComment = comment[Math.floor(Math.random() * comments.length)];
  return randomComment;
};

var getRandomName = function (Name) {
  var randomName = Name[Math.floor(Math.random() * Name.length)];
  return randomName;
};

var getRandomAvatar = function (n) {
  return 'img/' + Math.floor(Math.random() * (n + 1 - 1)) + 1 + '.svg';
};

var commentArr = function (n) {
  var user = [];
  for (var i = 0; i < n; i++) {
    user[i] = {avatar: getRandomAvatar(6), message: getRandomComment(comments), name: getRandomName(names)};
  }
  return user;
};

var createNewArr = function (n) {
  var ojectArr = [];
  var min = 0;
  var max = 100;
  for (var i = 1; i <= n; i++) {
    ojectArr.push({url: url(i), likes: likes(min, max), comments: commentArr(Math.floor(Math.random() * 10))});
  }
  return ojectArr;
};

var picture = document.querySelector('#picture')
.content
.querySelector('.picture');

var newPicture = function (data) {
  var picturedArr = [];
  for (var i = 0; i < data.length; i++) {
    var pictureElement = picture.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = data[i].url;
    pictureElement.querySelector('.picture__likes').textContent = data[i].likes;
    pictureElement.querySelector('.picture__comments').textContent = data[i].comments.length;
    picturedArr.push(pictureElement);
  }
  return picturedArr;
};

function addPictures(arr) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(arr[i]);
  }
  return fragment;
}

var array = createNewArr(25);
var pictures = newPicture(array);
var fragment = addPictures(pictures);
document.querySelector('.pictures').appendChild(fragment);

var upload = document.querySelector('.img-upload__overlay');
var uploadOpen = document.getElementById('upload-file');
var uploadClose = document.getElementById('upload-cancel');
var change = document.querySelector('.effects__list');
var img = document.querySelector('.img-upload__preview');
var smoll = document.querySelector('.scale__control--smaller');
var big = document.querySelector('.scale__control--bigger');
var bar = document.querySelector('.scale__control--value');
var line = document.querySelector('.effect-level__line');
var pin = document.querySelector('.effect-level__pin');
var effectLevel = document.querySelector('.effect-level__value');
var depth = document.querySelector('.effect-level__depth');
var label = document.querySelector('.img-upload__effect-level');
var imgLabel = document.querySelector('.img-upload__label');
var effect = document.querySelector('.img-upload__effects');
var socialText = document.querySelector('.social__footer-text');

// открытие и закрытия попапа.
uploadOpen.addEventListener('change', function () {
  upload.classList.remove('hidden');
  label.classList.add('hidden');
  if (oldValue !== null) {
    document.querySelector('.effects__preview--' + oldValue);
  }
  img.classList.remove('effects__preview--' + oldValue);
  img.removeAttribute('style');

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      upload.classList.add('hidden');
    }
  });
});

uploadClose.addEventListener('click', function () {
  upload.classList.add('hidden');
});

// валидация
socialText.addEventListener('invalid', function (evt) {
  if (socialText.validity.tooLong) {
  socialText.setCustomValidity('Комментарий не должен превышать 140-ка символов');
}
else {
   socialText.setCustomValidity('');
 }
});
// делегирование кнопок
var oldValue = null;
change.addEventListener('change', function (evt) {
  var target = evt.target;
  while (target !== document) {
    if (target.classList.contains('effects__radio')) {
      if (oldValue !== null) {
        img.classList.remove('effects__preview--' + oldValue);
      }
      oldValue = target.value;
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
smoll.addEventListener('click', function () {
  // шаг кнопки по клику
  var current = parseInt(bar.getAttribute('value'), 10) - 25;
  var getValue = getControlValue(current, 25, 100);
  if (!getValue) {
    current = 25;
  }
  bar.setAttribute('value', current + '%');
  return;
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
  return;
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
    effectLevel.value = Math.ceil(value);
  };

  document.onmouseup = function () {
    document.onmousemove = null;
    document.onmouseup = null;
    changeEffect(target.style.left);
    effectLevel.value = target.style.left;
  };
});
