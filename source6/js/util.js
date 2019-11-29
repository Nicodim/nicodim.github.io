'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var textDescription = document.querySelector('.text__description');
  var textHashtags = document.querySelector('.text__hashtags');

  window.util = {
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,

    getRandomNumber: function (min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    },

    getUniqueElement: function (arr, quantity) {
      var uniqueElement = [];
      var buffer = arr.slice();

      for (var i = 0; i < quantity; i++) {
        var randomIndex = window.util.getRandomNumber(0, buffer.length - 1);

        if (randomIndex >= 0) {

          uniqueElement.push(buffer[randomIndex]);
          buffer.splice(randomIndex, 1);
        }
      }
      return uniqueElement;
    },

    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE
        && textDescription !== document.activeElement
        && textHashtags !== document.activeElement) {
        action();
      }
    }

  };
})();
