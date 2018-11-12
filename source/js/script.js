var map = document.querySelector('.contacts__map');

ymaps.ready(function () {
  var myMap = new ymaps.Map('map', {
    center: [59.938631, 30.323055],
    zoom: 16
  }, {
      searchControlProvider: 'yandex#search'
    }),
    myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
      hintContent: 'Мы здесь!',
    }, {
        iconLayout: 'default#image',
        iconImageHref: './img/icon-map-marker.svg',
        iconImageSize: [35, 35]
      });

  myMap.geoObjects
    .add(myPlacemark)
});
