// // const activateError = (formElement, inputElement, errorMessage, validation) => {
// //   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
// //   inputElement.classList.add(validation.inputErrorClass);
// //   errorElement.textContent = errorMessage;
// //   errorElement.classList.add(validation.errorClass);
// // };

// const disableError = (formElement, inputElement, validation) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.remove(validation.inputErrorClass);
//   errorElement.classList.remove(validation.errorClass);
//   errorElement.textContent = "";
// };

// const checkInputValidity = (formElement, inputElement, validation) => {
//   if (!inputElement.validity.valid) {
//     activateError(
//       formElement,
//       inputElement,
//       inputElement.validationMessage,
//       validation
//     );
//   } else {
//     disableError(formElement, inputElement, validation);
//   }
// };

// const deactivateButton = (buttonElement) => {
//   if (buttonElement) {
//     buttonElement.disabled = true;
//   }
// };

// const activateButton = (buttonElement) => {
//   if (buttonElement) {
//     buttonElement.disabled = false;
//   }
// };

// const toggleButtonState = (inputList, buttonElement) => {
//   if (hasInvalidInput(inputList)) {
//     deactivateButton(buttonElement);
//   } else {
//     activateButton(buttonElement);
//   }
// };

// const setEventListeners = (formElement, validation) => {
//   const inputList = Array.from(
//     formElement.querySelectorAll(validation.inputSelector)
//   );
//   const buttonElement = formElement.querySelector(
//     validation.submitButtonSelector
//   );
//   toggleButtonState(inputList, buttonElement);
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener("input", function () {
//       checkInputValidity(formElement, inputElement, validation);
//       toggleButtonState(inputList, buttonElement);
//     });
//   });
// };

// function enableValidation(validation) {
//   const formList = Array.from(
//     document.querySelectorAll(validation.formSelector)
//   );
//   formList.forEach((formElement) => {
//     setEventListeners(formElement, validation);
//   });
// }

// enableValidation(validation);

// function hasInvalidInput(inputList) {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   });
// }
