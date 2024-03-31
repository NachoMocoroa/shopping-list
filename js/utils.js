const utils = (function () {

	const keyDataLocalStorage 	= 'data';
	const classInputError 		= 'input-error';

    const module = {
		_getLocalStorage: () => {
			return JSON.parse(localStorage.getItem(keyDataLocalStorage));
		},
		_setLocalStorage: (value) => {
			localStorage.setItem(keyDataLocalStorage, JSON.stringify(value));
		},
		_removeLocalStorage: () => {
			localStorage.removeItem(keyDataLocalStorage);
		},
		_clearLocalStorage: () => {
			localStorage.clear();
		},
		_hasText: (text) => {
			return text.trim().length > 0;
		},
		_getTrimText: (text) => {
			return text.trim();
		},
		_normalizeAccents: (str) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, ''),
		_removeAccents: (str) => {
			return typeof str === 'string' ? module._normalizeAccents(str) : module._normalizeAccents(str.toString()).split(',');
		},
		_getFiltered: (arr, value) => arr.filter((ele) => module._removeAccents(ele.toLowerCase()).startsWith(module._removeAccents(value.toLowerCase()))),
		_checkInputValue: (e) => {
			const inputField = e.target;
			let inputValue = inputField.value;
			inputField.classList.remove(classInputError);
			if (!module._hasText(inputValue)) {
				inputField.classList.add(classInputError);
				inputValue = '';
			}
		},
		_removeInputError: (e) => {
			const inputField = e.target;
			if (inputField.classList.contains(classInputError)) {
				inputField.classList.remove(classInputError);
			}
			if (!module._hasText(inputField.value)) {
				inputField.value = '';
			}
		}
	};

	return {
		getLocalStorage: module._getLocalStorage,
		setLocalStorage: module._setLocalStorage,
		removeLocalStorage: module._removeLocalStorage,
		clearLocalStorage: module._clearLocalStorage,
		hasText: module._hasText,
		getTrimText: module._getTrimText,
		removeAccents: module._removeAccents,
		getFiltered: module._getFiltered,
		checkInputValue: module._checkInputValue,
		removeInputError: module._removeInputError
	};

})();
