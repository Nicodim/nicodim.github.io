'use strict';
(function () {

	let canvas = new fabric.Canvas('canvas');
	let Add_text = document.querySelector('.Add-text');
	let figure = document.querySelectorAll('.form-option');
	let info = document.querySelector('.form-list');
	let size_figure = document.querySelectorAll('.size-container');
	let content = document.querySelectorAll('.option-item');
	let controls_container = document.querySelector('.controls-container');
	let controls_box = document.querySelector('.controls-box');
	let sizeWrapper = document.querySelectorAll('.size-wrapper');
	let size_content = document.querySelectorAll('.square-size');
	let next_btn = document.querySelector('.next-btn');
	let tp_link = document.querySelector('.tp-link');
	let back_btn = document.querySelector('.back-btn');
	let trash = document.querySelector('.trash');
	let php_form = document.querySelector('.php-form');
	canvas.setHeight(300);
	canvas.setWidth(300);

	//______________load img

	let imageLoader = document.getElementById('loadImage');

	imageLoader.addEventListener('change', handleImage, false);
	function handleImage(e) {
		let reader = new FileReader();
		reader.onload = function (event) {
			let img = new Image();
			img.onload = function () {
				let imgInstance = new fabric.Image(img, {
					// scaleX: 0.8,
					// scaleY: 0.8,
					left: 10,
					top: 10,
					borderColor: '#FA245C',
					cornerColor: '#FA245C',
				})
				imgInstance.scaleToHeight(280);
				imgInstance.scaleToWidth(280);
				canvas.add(imgInstance).setActiveObject(imgInstance);
			}
			img.src = event.target.result;
		}
		controls_container.classList.remove('hidden');
		controls_container.classList.add('show');
		reader.readAsDataURL(e.target.files[0]);
	}

	Add_text.addEventListener('click', function () {
		Addtext();
	});

	function Addtext() {
		let obj = new fabric.IText('Tap and Type', {
			left: 35,
			top: 135,
			fontFamily: 'arial',
			fill: '#333',
			fontSize: 35,
			fontWeight: 'bold',
			borderColor: '#FA245C',
			cornerColor: '#FA245C',
			cornerSize: 15,
		});
		canvas.add(obj);
		canvas.setActiveObject(obj);
		canvas.focus(obj);
	}

	canvas.on('text:editing:entered', function (props) {
		const text = props.target;
		text.hiddenTextarea.style.height = text.fontSize + 'px';
		text.hiddenTextarea.style.width = '0px';
		text.hiddenTextarea.style['caret-color'] = 'transparent';
		text.hiddenTextarea.style['font-size'] = '16px';
	});

	Add_text.addEventListener('click', function () {
		controls_box.classList.remove('hidden');
		controls_box.classList.add('show');
		controls_container.classList.remove('hidden');
		controls_container.classList.add('show');
	})

	trash.addEventListener('click', function () {
		let activeObject = canvas.getActiveObject();
		if (activeObject) {
			canvas.remove(activeObject);
		}

	});

	$('#text-color').on('change', function () {
		canvas.getActiveObject().set({ fill: this.value });
		canvas.renderAll();
	});

	$('#font-family').on('change', function () {
		canvas.getActiveObject().set({ fontFamily: this.value });
		canvas.renderAll();
	});

	$('.input-checkbox').change(function () {
		let arr = [];
		let check = $('.input-checkbox:checked');
		if (check) {
			check.toArray().map(el => arr.push(el.value))
			let info = arr.join(', ');
			$('.tp-input').attr("value", info);
			$('.visible-tp').html('תוספת: ' + info);
		}
		if ($('.input-checkbox:checked').length >= 2) {
			$('.input-checkbox:not(:checked)').attr('disabled', "disabled");
		} else {
			$('.input-checkbox:disabled').removeAttr('disabled');
		}
	});


	let radios5 = $("[name=fonttype]"); // wijzig naar button
	for (var i = 0, max = radios5.length; i < max; i++) {
		radios5[i].onclick = function () {

			if (document.getElementById(this.id).checked == true) {
				if (this.id == "text-cmd-bold") {
					canvas.getActiveObject().set("fontWeight", "bold");
				}
				if (this.id == "text-cmd-italic") {
					canvas.getActiveObject().set("fontStyle", "italic");
				}
				// if (this.id == "text-cmd-underline") {
				// 	canvas.getActiveObject().set("textDecoration", "underline");
				// }
				// if (this.id == "text-cmd-linethrough") {
				// 	canvas.getActiveObject().set("textDecoration", "line-through");
				// }
				// if (this.id == "text-cmd-overline") {
				// 	canvas.getActiveObject().set("textDecoration", "overline");
				// }
			} else {
				if (this.id == "text-cmd-bold") {
					canvas.getActiveObject().set("fontWeight", "");
				}
				if (this.id == "text-cmd-italic") {
					canvas.getActiveObject().set("fontStyle", "");
				}
				// if (this.id == "text-cmd-underline") {
				// 	canvas.getActiveObject().set("textDecoration", "");
				// }
				// if (this.id == "text-cmd-linethrough") {
				// 	canvas.getActiveObject().set("textDecoration", "");
				// }
				// if (this.id == "text-cmd-overline") {
				// 	canvas.getActiveObject().set("textDecoration", "");
				// }
			}
			canvas.renderAll();
		}
	}

	// let valid = document.getElementById('tel')
	// function phonenumber(inputtxt){
	//   var phone = /^\d{10}$/;
	//   if(inputtxt.value.match(phone)){
	// 	  return true;
	// 		}else{
	// 		alert("NOMER ZAPILI PIDOR BL'A");
	// 		return false;
	// 		}
	// }

	// phonenumber(valid)

	// ________________________________________________________________________________delegation


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

	info.addEventListener('click', function (event) {
		let target = event.target.closest('.form-option');
		if (!target) return;
		if (!info.contains(target)) return;
		if ((target && target.classList.contains('form-option')) && (target && target.classList.contains('circle'))) {
			for (let i = 0; i < figure.length; i++) {
				if (target == figure[i]) {
					showOption(1);
					hideContent(0);
					showContent(i);
					canvas.setOverlayImage('img/circle-bg.png', canvas.renderAll.bind(canvas));
					document.querySelector('.shape-input').value = 'עיגול';
					document.querySelector('.visible-shape').innerHTML = "צורה: עיגול";

					document.querySelector('.form-square').style["border-color"] = 'black';
					document.querySelector('.form-heart').style["fill"] = 'black';
					document.querySelector('.form-circle').style["border-color"] = 'rgb(250, 36, 92)';
					break;
				}
			}
		} else
			if ((target && target.classList.contains('form-option')) && (target && target.classList.contains('heart'))) {
				for (let i = 0; i < figure.length; i++) {
					if (target == figure[i]) {

						showOption(1);
						hideContent(0);
						showContent(i);
						canvas.setOverlayImage('img/300.png', canvas.renderAll.bind(canvas));
						document.getElementById('shape-input').value = 'לב';
						document.querySelector('.visible-shape').innerHTML = "צורה: לב";

						document.querySelector('.form-square').style["border-color"] = 'black';
						document.querySelector('.form-circle').style["border-color"] = 'black';
						document.querySelector('.form-heart').style["fill"] = 'rgb(250, 36, 92)';
						break;
					}
				}
			} else
				if ((target && target.classList.contains('form-option')) && (target && target.classList.contains('square'))) {
					for (let i = 0; i < figure.length; i++) {
						if (target == figure[i]) {

							showOption(1);
							hideContent(0);
							showContent(i);
							canvas.setOverlayImage('img/square-bg.png', canvas.renderAll.bind(canvas));
							document.getElementById('shape-input').value = 'ריבוע';
							document.querySelector('.visible-shape').innerHTML = "צורה: ריבוע";

							document.querySelector('.form-heart').style["fill"] = 'black';
							document.querySelector('.form-circle').style["border-color"] = 'black';
							document.querySelector('.form-square').style["border-color"] = 'rgb(250, 36, 92)';
							break;
						}
					}
				}
	});

	for (let i = 0; i < sizeWrapper.length; i++) {
		sizeWrapper[i].addEventListener('click', function (event) {
			let target = event.target.closest('.square-size');
			if (target && target.classList.contains('square-size')) {
				for (let i = 0; i < size_content.length; i++) {
					if ((target == size_content[i]) && (!target.classList.contains('disabled'))) {
						document.querySelector('.next-btn').classList.remove('hidden');
						break;
					}
				}
			}
			if (target && target.classList.contains('big-size')) {
				document.querySelector('.size-input').value = '17 * 17';
				document.querySelector('.visible-size').innerHTML = "גודל: 17 * 17";

			} else if (target && target.classList.contains('medium-size')) {
				document.querySelector('.size-input').value = '15 * 15';
				document.querySelector('.visible-size').innerHTML = "גודל: 15 * 15";
			}
			else if (target && target.classList.contains('small-size')) {
				document.querySelector('.size-input').value = '12 * 12';
				document.querySelector('.visible-size').innerHTML = "גודל: 12 * 12";
			}
			if (target && target.classList.contains('disabled')) {
				document.querySelector('.size-input').value = '';
				document.querySelector('.visible-size').innerHTML = ':גודל';
			}
		});
	};

	next_btn.addEventListener('click', function () {
		hideOption(0);
		showOption(2);
		let parent_origin = 'https://www.shokoladsheli.co.il'
		parent.postMessage({ 'task': 'scroll_top' }, parent_origin);
	})


	//wix-adaptation
	// let parent_origin = 'https://www.shokoladsheli.co.il'
	// let parent_origin = 'https://nick.webstockprojects.co.il'
	// parent.postMessage({ 'task': 'scroll_top' }, parent_origin);
	//

	back_btn.addEventListener('click', function () {
		hideOption(0);
		showOption(0);
		document.querySelector('.next-btn').classList.add('hidden');
		controls_box.classList.remove('show');
		controls_box.classList.add('hidden');
		$('input:checked').prop('checked', false);
		document.querySelector('.form-heart').style["fill"] = 'black';
		document.querySelector('.form-circle').style["border-color"] = 'black';
		document.querySelector('.form-square').style["border-color"] = 'black';
		// canvas.clear();
	})

	tp_link.addEventListener('click', function () {
		let dataURL = canvas.toDataURL({ multiplier: 4 });
		document.querySelector('.img-canvas').setAttribute("value", dataURL);
		document.querySelector('.visible-img').src = dataURL;
		hideOption(0);
		showOption(3);
	});

	document.querySelector('.next-tp').addEventListener('click', function () {
		hideOption(0);
		showOption(4);
	});

	document.querySelector('.back-tp').addEventListener('click', function () {
		hideOption(0);
		showOption(2);
		$('input:checked').prop('checked', false);
	});

	document.querySelector('.form-back').addEventListener('click', function (event) {
		hideOption(0);
		showOption(3);
		$('input:checked').prop('checked', false);
	})

	php_form.addEventListener('submit', function () {
		document.php_form.reset();
	});

	document.querySelector('.submit-button').addEventListener('click', function () {
		let valid = document.querySelectorAll('.form-required');
		let empty = false;
		valid.forEach(e => {
			if (e.value == "") {
				empty = true;
			}
		});
		if (!empty) {
			document.querySelector('.btn-controls').classList.add('visually-hidden');
			document.querySelector('.spinner').classList.remove('hidden');
		}
	});
})()







	// SAVE IMG
	// let imageSaver = document.getElementById('imageSaver');
	// imageSaver.addEventListener('click', saveImage, false);

	// function saveImage(e) {
	// 	this.href = canvas.toDataURL({
	// 		format: 'jpeg',
	// 		quality: 0.8,
	// 	});
	// 	this.download = 'test.png'
	// }