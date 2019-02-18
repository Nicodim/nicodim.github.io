var link = document.querySelector(".catalog__item-js");
var popup = document.querySelector(".modal");
var close = popup.querySelector(".modal__close");
var menulink = document.querySelector(".menu__link");
var menu = document.querySelector(".categories__list-wrapper");


link.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup.classList.add("modal-show");
});

close.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup.classList.remove("modal-show");
});

menulink.addEventListener("click", function (evt) {
  evt.preventDefault();
  menu.classList.add("modal__show");
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    if (popup.classList.contains("modal-show")) {
      popup.classList.remove("modal-show");
    }
  }
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    if (menu.classList.contains("modal__show")) {
      menu.classList.remove("modal__show");
    }
  }
});
