class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    this._inputElement = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._submitButtonElement = formElement.querySelector(
      this._submitButtonSelector
    );
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputElement)
    );
  }

  _activateError(inputElement) {
    this._errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    this._errorElement.textContent = inputElement.validationMessage;
    this._errorElement.classList.add(this._errorClass);
  }

  _disableError(inputElement) {
    console.log(this._formElement);
    this._errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    console.log(this._errorElement);
    inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.classList.remove(this._errorClass);
    this._errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._activateError(inputElement);
    } else {
      this._disableError(inputElement);
    }
  }

  _deactivateButton() {
    if (this._submitButtonElement) {
      this._submitButtonElement.setAttribute("disabled", true);
    }
  }

  _activateButton() {
    if (this._submitButtonElement) {
      this._submitButtonElement.removeAttribute("disabled", true);
    }
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._deactivateButton(this._submitButtonElement);
    } else {
      this._activateButton(this._submitButtonElement);
    }
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._disableError(inputElement);
    });
  }
}

export default FormValidator;
