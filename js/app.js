const app = (function () {

	const selectorEditableText 	= '.editable-text';
	const classEditItem 		= 'edit-item';
	const classRemoveItem 		= 'remove-item';
	const classEditing 			= 'editing';

    const module = {
		dataList		: utils.getLocalStorage() || [],
		buttonAdd		: document.querySelector('#item-form button'),
		filterInput		: document.querySelector('#filter'),
		itemInput		: document.querySelector('#item-input'),
		itemList		: document.querySelector('#item-list'),
		clearBtn		: document.querySelector('#clear'),
		itemsCounter	: document.querySelector('#items-counter'),
		textToEdit		: null
	};

	module._manageData = (data) => {
		const uiElements = [
			module.clearBtn,
			module.itemList.parentElement,
			module.filterInput.parentElement.parentElement
		];
		utils.setLocalStorage(data);
		uiManager.checkUIState(data, module.itemsCounter, uiElements);
	};

	module._clearAll = (e) => {
		e.preventDefault();
		module.dataList = [];
		module.itemList.innerHTML = '';
		module._manageData(module.dataList);
	};

	module._removeInArray = (text) => {
		module.dataList = module.dataList.filter((ele) => ele !== text);
		module._manageData(module.dataList);
	};
	
	module._deleteItem = (e) => {
		e.preventDefault();
		const liElement = e.target.parentElement.parentElement;
		const textEditable = liElement.querySelector(selectorEditableText);
		const textToRemove = utils.getTrimText(textEditable.textContent);
		module._removeInArray(textToRemove);
		liElement.remove();
	};
	
	module._enableEdition = (liElement) => {
		const textEditable = liElement.querySelector(selectorEditableText);
		uiManager.setEditionStatus(liElement, true);
		module.textToEdit = textEditable.textContent;
	};
	
	module._disableEdition = (liElement) => {
		uiManager.setEditionStatus(liElement, false);
		module.textToEdit = null;
	};

	module._saveText = (liElement) => {
		const newText = liElement.querySelector(selectorEditableText).textContent;
		if (module.textToEdit !== newText) {
			liElement.dataset.text = newText;
			module.dataList = module.dataList.map((ele) => ele === module.textToEdit ? newText : ele);
			utils.setLocalStorage(module.dataList);
		}
		module._disableEdition(liElement);
	};
	
	module._filterEdition = (e) => {
		e.preventDefault();
		const interactiveElements = [module.buttonAdd, module.filterInput, module.itemInput, module.clearBtn];
		const liElement = e.target.parentElement.parentElement;
		const textEditable = liElement.querySelector(selectorEditableText);
		const isEditing = textEditable.classList.contains(classEditing);
		if (isEditing) {
			uiManager.setDisableElements(liElement, false, interactiveElements);
			module._saveText(liElement);
		} else {
			uiManager.setDisableElements(liElement, true, interactiveElements);
			module._enableEdition(liElement);
		}
	};
	
	module._manageListEvent = (e) => {
		if (e.target.classList.contains(classRemoveItem)) {
			module._deleteItem(e);
		}
		if (e.target.classList.contains(classEditItem)) {
			module._filterEdition(e);
		}
	};

	module._filterItem = (e) => {
		const textFormatted = utils.getTrimText(e.target.value);
		if (textFormatted.length) {
			const found = utils.getFiltered(module.dataList, textFormatted);
			if (found) {
				uiManager.setFilteredList(found);
			}
		} else {
			uiManager.resetList();
			module.filterInput.value = '';
		}
	};

	module._generateItemList = (value) => {
		const textFormatted = utils.getTrimText(value);
		const listElement = uiManager.createListElement(textFormatted);
		module.itemList.appendChild(listElement);
		module.dataList.push(textFormatted);
		module._manageData(module.dataList);
	};

	module._addValueToList = (e) => {
		e.preventDefault();
		const inputValue = module.itemInput.value;
		utils.checkInputValue({target: module.itemInput});
		if (utils.hasText(inputValue)) {
			module._generateItemList(inputValue);
		}
		module.itemInput.value = '';
	};

	module._addListeners = () => {
		module.buttonAdd.addEventListener('click', (e) => module._addValueToList(e));
		module.clearBtn.addEventListener('click', (e) => module._clearAll(e));
		module.itemList.addEventListener('click', (e) => module._manageListEvent(e));
		module.itemInput.addEventListener('input', (e) => utils.checkInputValue(e));
		module.itemInput.addEventListener('blur', (e) => utils.removeInputError(e));
		module.filterInput.addEventListener('input', (e) => module._filterItem(e));
	};

	module._setInitialState = function () {
		if (module.dataList.length) {
			uiManager.generateListElements(module.dataList);
		}
		module._manageData(module.dataList);
	};

	module._init = function () {
		module._addListeners();
		module._setInitialState();
	};

	return {
		init: module._init,
	};

})();
