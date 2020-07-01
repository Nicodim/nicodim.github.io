'use strict';

(function () {

    let figure = document.querySelectorAll('.form-option');
    let info = document.querySelector('.form-list');
    let content = document.querySelectorAll('.option-item');
    let size_figure = document.querySelectorAll('.size-container');
    let sizeWrapper = document.querySelectorAll('.size-wrapper');
    let size_content = document.querySelectorAll('.square-size');
    let size = document.querySelector('.canvas-container');
    let mail_link = document.querySelector('.mail-link');



    function hideOption(a) {
        for (let i = a; i < content.length; i++) {
            content[i].classList.remove('show');
            content[i].classList.add('hidden');
        }
    }
    hideOption(1);

    function showOption(b) {
        if (content[b].classList.contains('hidden')) {
            content[b].classList.remove('hidden');
            content[b].classList.add('show');
        }
    }

    function hideContent(a) {
        for (let i = a; i < size_figure.length; i++) {
            size_figure[i].classList.remove('show');
            size_figure[i].classList.add('hidden');
        }
    }

    function showContent(b) {
        if (size_figure[b].classList.contains('hidden')) {
            size_figure[b].classList.remove('hidden');
            size_figure[b].classList.add('show');
        }
    }

    // function hideContur(a) {
    //     for (let i = a; i < contur.length; i++) {
    //         contur[i].classList.remove('show');
    //         contur[i].classList.add('hidden');
    //     }
    // }
    // hideContur(0);

    // function showContur(b) {
    //     if (contur[b].classList.contains('hidden')) {
    //         contur[b].classList.remove('hidden');
    //         contur[b].classList.add('show');
    //     }
    // }

    info.addEventListener('click', function (event) {
        let target = event.target.closest('.form-option');
        if (!target) return;
        if (!info.contains(target)) return;
        if (target && target.classList.contains('form-option')) {
            for (let i = 0; i < figure.length; i++) {
                if (target == figure[i]) {
                    hideOption(0);
                    showOption(1);
                    hideContent(0);
                    showContent(i);
                    // hideContur(0);
                    // showContur(i);
                          // canvas.setOverlayImage(contur[b], canvas.renderAll.bind(canvas));
                    break;
                }
            }
        }
    });

    for (let i = 0; i < sizeWrapper.length; i++) {
        sizeWrapper[i].addEventListener('click', function(event) {
            let target = event.target.closest('.square-size');
            if (target && target.classList.contains('square-size')) {
                for (let i = 0; i < size_content.length; i++) {
                    if (target == size_content[i]) {
                        hideOption(0);
                        showOption(2);
                        break;
                    }
                }
            }
            // if (target && target.classList.contains('big-size')) {
            //     size.style.width = '500px';
            //     size.style.height = '446px';
                // canvas.setWidth(500);
                // canvas.setHeight(446)
                // canvas.renderAll.bind(canvas);
            // } else if (target && target.classList.contains('small-size')) {
            //     size.style.width = '300px';
            //     size.style.height = '246px';
            //     // canvas.renderAll.bind(canvas);
            // }
        });
    };

    mail_link.addEventListener('click', function() {
        hideOption(0);
        showOption(3);
    });
})();
