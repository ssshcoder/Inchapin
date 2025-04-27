document.addEventListener("DOMContentLoaded", () => {

	initModals()

	const element = document.getElementById('tel');
	const maskOptions = {
		mask: '+{7}(000)000-00-00'
	};
	const mask = IMask(element, maskOptions);

	// форма
	let form = document.querySelector('#call-form')
	form.addEventListener('submit', (e) => {
		e.preventDefault()
		serializeForm(form)

	})
	function serializeForm(formNode) {
		const { elements } = formNode

		Array.from(elements)
			.forEach((element) => {
				const { name, value } = element
				console.log({ name, value })
			})
	}

	// склолл	
	// var Scrollbar = window.Scrollbar;
	// Scrollbar.initAll();
	// console.log(Scrollbar)
	// Scrollbar.init(document.querySelector('#main-scrollbar'));


	// отступ сверху для фиксированного хедера
	let header = document.querySelector('header.header')
	if (header) {
		document.querySelector('body').style.paddingTop = header.offsetHeight + "px"

		window.addEventListener('resize', () => {
			document.querySelector('body').style.paddingTop = header.offsetHeight + "px"
		})
	}

	// 100% высоты для Intro
	const introHeight = () => {
		const doc = document.documentElement
		let introInner = document.querySelector('.intro .intro__inner')
		let introBottomHeight = introInner.querySelector('.intro__bottom').clientHeight
		doc.style.setProperty('--intro-height', `${window.innerHeight - header.offsetHeight}px`)
		doc.style.setProperty('--intro-bottom-height', `${introBottomHeight}px`)
		console.log(introBottomHeight)
	}
	window.addEventListener('resize', introHeight)
	introHeight()

})

function initModals() {

	let modalOpenButtons = document.querySelectorAll('.js-modal-open');
	let infoModalOpenButtons = document.querySelectorAll('.js-modal-open_service-modal');
	infoModalOpenButtons = [...infoModalOpenButtons, ...document.querySelectorAll('.js-params-modal')]

	if (!Boolean(modalOpenButtons)) {
		return;
	}

	let inProcess = false;

	modalOpenButtons.forEach(elem => {
		let modal = document.querySelector('#' + elem.dataset.modalId);

		if (!modal) {
			console.log(new Error('modal not found'));
			return;
		}

		elem.addEventListener('click', (e) => {

			e.preventDefault();

			let alreadyOpenedModal = document.querySelector('.modal--visible');

			if (alreadyOpenedModal) {
				openModal(modal, true);
				closeModal(alreadyOpenedModal, true);
				return;
			}

			openModal(modal);

		});

		let modalCloseButtons = modal.querySelectorAll('.js-modal-close');

		modalCloseButtons.forEach(elem => {
			elem.addEventListener('click', () => {
				closeModal(modal)
			});
		});
	});
	infoModalOpenButtons.forEach(elem => {
		let modal = document.querySelector('#' + elem.dataset.modalId);

		if (!modal) {
			console.log(new Error('infoModal not found'));
			return;
		}

		let params = {
			title: elem.dataset.title ? elem.dataset.title : '',
			description: elem.dataset.description ? elem.dataset.description : '',
			img: elem.dataset.img ? elem.dataset.img : '',
			video: elem.dataset.video ? elem.dataset.video : '',
			goal: elem.dataset.goal ? elem.dataset.goal : '',
			solution: elem.dataset.solution ? elem.dataset.solution : '',

			after_1: elem.dataset.after1 ? elem.dataset.after1 : '',
			after_2: elem.dataset.after2 ? elem.dataset.after2 : '',
			after_3: elem.dataset.after3 ? elem.dataset.after3 : '',
			before_1: elem.dataset.before1 ? elem.dataset.before1 : '',
			before_2: elem.dataset.before2 ? elem.dataset.before2 : '',
			before_3: elem.dataset.before3 ? elem.dataset.before3 : '',
			result_value_1: elem.dataset.resultValue1 ? elem.dataset.resultValue1 : '',
			result_value_2: elem.dataset.resultValue2 ? elem.dataset.resultValue2 : '',
			result_value_3: elem.dataset.resultValue3 ? elem.dataset.resultValue3 : '',
			result_value_4: elem.dataset.resultValue4 ? elem.dataset.resultValue4 : '',
			result_value_5: elem.dataset.resultValue5 ? elem.dataset.resultValue5 : '',
			result_descr_1: elem.dataset.resultDescr1 ? elem.dataset.resultDescr1 : '',
			result_descr_2: elem.dataset.resultDescr2 ? elem.dataset.resultDescr2 : '',
			result_descr_3: elem.dataset.resultDescr3 ? elem.dataset.resultDescr3 : '',
			result_descr_4: elem.dataset.resultDescr4 ? elem.dataset.resultDescr4 : '',
			result_descr_5: elem.dataset.resultDescr5 ? elem.dataset.resultDescr5 : '',
			resume: elem.dataset.resume ? elem.dataset.resume : '',
		}

		elem.addEventListener('click', (e) => {

			e.preventDefault();

			let alreadyOpenedModal = document.querySelector('.modal--visible');

			if (alreadyOpenedModal) {
				openInfoModal(modal, true, params);
				closeModal(alreadyOpenedModal, true);
				return;
			}

			openInfoModal(modal, false, params);

		});

		let modalCloseButtons = modal.querySelectorAll('.js-modal-close');

		modalCloseButtons.forEach(elem => {
			elem.addEventListener('click', () => {
				closeModal(modal)
			});
		});

	});

	function openModal(modal, immediatly) {

		if (inProcess) {
			return;
		}

		if (immediatly) {
			modal.querySelector('.modal__overlay').style.transition = 'none';
			modal.querySelector('.modal__content').style.transition = 'none';
			modal.classList.add('modal--visible');
			modal.style.visibility = 'visible';

			setTimeout(() => {
				modal.querySelector('.modal__overlay').style.transition = '';
				modal.querySelector('.modal__content').style.transition = '';
			}, 0);

			return;
		}

		disableScroll();
		inProcess = true;
		modal.style.visibility = 'visible';
		modal.classList.add('modal--visible');

		let timer = setTimeout(() => {

			inProcess = false;
			clearTimeout(timer);

		}, 300)

	}

	function openInfoModal(modal, immediatly, params) {

		// вставка значений
		if (modal.querySelector('.info-modal__title')) {
			modal.querySelector('.info-modal__title').textContent = params.title;
		} else if (modal.querySelector('.case-modal__title-text')) {
			modal.querySelector('.case-modal__title-text').textContent = params.title;
		}
		if (modal.querySelector('.info-modal__description')) {
			modal.querySelector('.info-modal__description').innerHTML = params.description;
		}
		if (modal.querySelector('.info-modal__img')) {
			modal.querySelector('.info-modal__img').src = params.img;
		} else if (modal.querySelector('.case-modal__img')) {
			modal.querySelector('.case-modal__img').src = params.img;
		}
		if (modal.querySelector('.goal-text')) {
			modal.querySelector('.goal-text').innerHTML = params.goal;
		} else if (modal.querySelector('.goal__text')) {
			modal.querySelector('.goal__text').innerHTML = params.goal;
		}
		if (modal.querySelector('.solution-text')) {
			modal.querySelector('.solution-text').innerHTML = params.solution;
		}
		if (modal.querySelector('.case-modal__resume-text')) {
			modal.querySelector('.case-modal__resume-text').innerHTML = params.resume;
		}
		if (modal.querySelector('.video')) {
			modal.querySelector('.video').src = params.video;
		}

		let beforeList = modal.querySelector('.case-modal__before-list')
		if (beforeList) {
			beforeList.innerHTML = ''
		}
		if (params.after_1 && beforeList) {
			let li = document.createElement('li')
			li.classList.add('item')
			li.textContent = params.after_1
			beforeList.appendChild(li);
		}
		if (params.after_2 && beforeList) {
			let li = document.createElement('li')
			li.classList.add('item')
			li.textContent = params.after_2
			beforeList.appendChild(li);
		}
		if (params.after_3 && beforeList) {
			let li = document.createElement('li')
			li.classList.add('item')
			li.textContent = params.after_3
			beforeList.appendChild(li);
		}

		let afterList = modal.querySelector('.case-modal__after-list')
		if (afterList) {
			afterList.innerHTML = ''
		}
		if (params.before_1 && afterList) {
			let li = document.createElement('li')
			li.classList.add('item')
			li.textContent = params.before_1
			afterList.appendChild(li);
		}
		if (params.before_2 && afterList) {
			let li = document.createElement('li')
			li.classList.add('item')
			li.textContent = params.before_2
			afterList.appendChild(li);
		}
		if (params.before_3 && afterList) {
			let li = document.createElement('li')
			li.classList.add('item')
			li.textContent = params.before_3
			afterList.appendChild(li);
		}

		function createResultItem(value, text) {
			let li = document.createElement('li')
			li.classList.add('result-item')
			li.innerHTML = `
				<div class="result-item__top">
					<div class="result-item__color"></div>
					<div class="result-item__value">
						
					</div>
				</div>
				<div class="result-item__text">
					
				</div>
			`
			if (value) {
				li.querySelector('.result-item__value').textContent = value
			}
			if (text) {
				li.querySelector('.result-item__text').textContent = text
			}
			console.log(li)
			return li
		}
		let resultsList = modal.querySelector('.case-modal__results-list')
		if (resultsList) {
			resultsList.innerHTML = ''
		}
		if (params.result_value_1 && params.result_descr_1 && resultsList) {
			let li = createResultItem(params.result_value_1, params.result_descr_1)
			resultsList.appendChild(li);
		}
		if (params.result_value_2 && params.result_descr_2 && resultsList) {
			let li = createResultItem(params.result_value_2, params.result_descr_2)
			resultsList.appendChild(li);
		}
		if (params.result_value_3 && params.result_descr_3 && resultsList) {
			let li = createResultItem(params.result_value_3, params.result_descr_3)
			resultsList.appendChild(li);
		}
		if (params.result_value_4 && params.result_descr_4 && resultsList) {
			let li = createResultItem(params.result_value_4, params.result_descr_4)
			resultsList.appendChild(li);
		}
		if (params.result_value_5 && params.result_descr_5 && resultsList) {
			let li = createResultItem(params.result_value_5, params.result_descr_5)
			resultsList.appendChild(li);
		}

		openModal(modal, immediatly);

	}

	function closeModal(modal, immediatly) {

		if (inProcess) {
			return;
		}

		if (modal.querySelector('video')) {
			modal.querySelector('video').pause();
		}

		if (immediatly) {
			modal.querySelector('.modal__overlay').style.transition = 'none';
			modal.querySelector('.modal__content').style.transition = 'none';
			modal.style.visibility = '';
			modal.classList.remove('modal--visible');

			setTimeout(() => {
				modal.querySelector('.modal__overlay').style.transition = '';
				modal.querySelector('.modal__content').style.transition = '';
			}, 0);

			return;
		}

		modal.classList.remove('modal--visible');
		inProcess = true;

		if (modal.querySelector('.contact-us-form')) {
			modal.querySelector('.contact-us-form').style.display = 'block';
		}
		if (modal.querySelector('.form-sucsses-message')) {
			modal.querySelector('.form-sucsses-message').remove();
		}

		let timer = setTimeout(() => {

			enableScroll();
			modal.style.visibility = '';
			inProcess = false;
			clearTimeout(timer);

		}, 300)
	}

}

let isMac = navigator.platform.toLowerCase().includes("mac")
function disableScroll() {
	if (isMac) {
		document.body.classList.add('stop-scroll-safari');
	} else {
		document.body.classList.add('stop-scroll');

	}
}
function enableScroll() {
	document.body.classList.remove('stop-scroll');
	document.body.classList.remove('stop-scroll-safari');
}