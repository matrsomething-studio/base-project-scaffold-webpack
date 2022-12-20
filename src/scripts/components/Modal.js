'use strict';

class Modal {
	constructor(el) {
		this._modal = el;
		this._modalID = el.id;
		this._modalCloseBtn = el.querySelector(`[data-modal-close]`);
		this._video = el.querySelector(`[data-video="${this._modalID}"]`) || null;
		this._videoThumb = document.querySelector(`[data-video-thumb="${this._modalID}"]`) || null;
		this._isModalOpen = false;

		this.bindEvents();
	}

	openModal() {
		this._modal.classList.add('modal-open');
		this._isModalOpen = true;
		this._video.play();
	}

	closeModal() {
		this._modal.classList.remove('modal-open');
		this._isModalOpen = false;
		this._video.pause();
		this._video.currentTime = 0;
	}

	bindEvents() {
		this._videoThumb.addEventListener('click', () => {
			this.openModal();
		});

		this._modalCloseBtn.addEventListener('click', () => {
			this.closeModal();
		});

		this._video.addEventListener('ended', () => {
			this.closeModal();
		});
	}
}

// Export(s)	
export {
	Modal
}