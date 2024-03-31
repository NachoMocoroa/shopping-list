const uiManager = (function () {

	const listId 				= '#item-list';
	const classEditableText 	= 'editable-text';
	const classDisplayNone 		= 'd-none';
	const classElementDisabled 	= 'element-disabled';
	const classBtnLink 			= 'btn-link';
	const classEditItem 		= 'edit-item';
	const classRemoveItem 		= 'remove-item';
	const classEditing 			= 'editing';
	const classFaSolid 			= 'fa-solid';
	const classFaIconEdit 		= 'fa-edit';
	const classFaIconCheck 		= 'fa-check';
	const classFaIconRemove 	= 'fa-xmark';
	const classTextGrey 		= 'text-grey';
	const classTextGreen 		= 'text-green';
	const classTextRed 			= 'text-red';

	const module = {
		_setEditionStatus: (liElement, enable) => {
			const textEditable = liElement.querySelector(`.${classEditableText}`);
			const buttonEditable = liElement.querySelector(`.${classEditItem}`);
			const iconEditable = buttonEditable.querySelector(`.${classFaSolid}`);
			enable ? buttonEditable.classList.remove(classTextGrey) : buttonEditable.classList.add(classTextGrey);
			enable ? buttonEditable.classList.add(classTextGreen) : buttonEditable.classList.remove(classTextGreen);
			enable ? iconEditable.classList.remove(classFaIconEdit) : iconEditable.classList.add(classFaIconEdit);
			enable ? iconEditable.classList.add(classFaIconCheck) : iconEditable.classList.remove(classFaIconCheck);
			enable ? textEditable.classList.add(classEditing) : textEditable.classList.remove(classEditing);
			textEditable.setAttribute('contentEditable', enable);
		},
		_createTagElement: (tag, classes, text) => {
			const tagElement = document.createElement(tag);
			tagElement.className = classes ? classes : null;
			tagElement.textContent = text ? text : null;
		
			return tagElement;
		},
		_createButtonEdit: () => {
			const buttonListElement = module._createTagElement('BUTTON', `${classEditItem} ${classBtnLink} ${classTextGrey}`);
			const iconElement = module._createTagElement('I', `${classFaSolid} ${classFaIconEdit}`);
			buttonListElement.appendChild(iconElement);
		
			return buttonListElement;
		},
		_createButtonRemove: () => {
			const buttonListElement = module._createTagElement('BUTTON', `${classRemoveItem} ${classBtnLink} ${classTextRed}`);
			const iconElement = module._createTagElement('I', `${classFaSolid} ${classFaIconRemove}`);
			buttonListElement.appendChild(iconElement);
		
			return buttonListElement;
		},
		_createListElement: (text) => {
			const listElement = module._createTagElement('LI', 'list-child');
			const pElement = module._createTagElement('P', classEditableText, text);
			const buttonsWrapper = module._createTagElement('DIV', 'buttons-wrapper');
			listElement.appendChild(pElement);
			buttonsWrapper.appendChild(module._createButtonEdit());
			buttonsWrapper.appendChild(module._createButtonRemove());
			listElement.appendChild(buttonsWrapper);
			listElement.dataset.text = text;
			
			return listElement;
		},
		_checkUIState: (dataList, counter, itemsList) => {
			counter.textContent = dataList.length ? `(${dataList.length})` : null;
			itemsList.forEach((elem) => {
				dataList.length ? elem.classList.remove(classDisplayNone) : elem.classList.add(classDisplayNone);
			});
		},
		_setFilteredList: (filterList) => {
			const normalizedList = utils.removeAccents(filterList);
			const liItems = document.querySelectorAll(`${listId} li`);
			liItems.forEach((liElem) => {
				const normalizedText = utils.removeAccents(liElem.dataset.text);
				normalizedList.includes(normalizedText) ? liElem.classList.remove(classDisplayNone) : liElem.classList.add(classDisplayNone);
			});
		},
		_resetList: () => {
			const liItems = document.querySelectorAll(`${listId} li`);
			liItems.forEach((liElem) => {
				liElem.classList.remove(classDisplayNone);
			});
		},
		_generateListElements: (data) => {
			const listItems = document.querySelector(listId);
			data.forEach((item) =>{
				const listElement = module._createListElement(item);
				listItems.appendChild(listElement);
			});
		},
		_setDisableElements: (liEl, disable, interactiveElements) => {
			const liItems = document.querySelectorAll(`${listId} li`);
			liItems.forEach((liElem) => {
				if(liElem !== liEl) {
					disable ? liElem.classList.add(classElementDisabled) : liElem.classList.remove(classElementDisabled);
				}
			});
			interactiveElements.forEach((elem) => {
				disable ? elem.classList.add(classElementDisabled) : elem.classList.remove(classElementDisabled);
			});
		}
	};

	return {
		setEditionStatus: module._setEditionStatus,
		createListElement: module._createListElement,
		checkUIState: module._checkUIState,
		setFilteredList: module._setFilteredList,
		resetList: module._resetList,
		generateListElements: module._generateListElements,
		setDisableElements: module._setDisableElements
	};

})();
