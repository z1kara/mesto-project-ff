function inputpattern(str) {
  const pattern = /^[A-Za-zА-Яа-яЁё\s\-]+$/;
  return pattern.test(str);
}

function showError(input, errorMessage) {
  const errorElement = document.querySelector(`#${input.name}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__error_visible');
}

function hideError(input) {
  const errorElement = document.querySelector(`#${input.name}-error`);
  errorElement.textContent = '';
  errorElement.classList.remove('popup__error_visible');
}

function checkInputValidity(input) {
  if (input.validity.valueMissing) {
    showError(input, 'Это обязательное поле');
    return false;
  }

  if (input.validity.tooShort || input.validity.tooLong) {
    let errorMessage;
    if (input.name === 'name') {
      errorMessage = 'Должно быть от 2 до 40 символов';
    } else if (input.name === 'description') {
      errorMessage = 'Должно быть от 2 до 200 символов';
    } else if (input.name === 'place-name') {
      errorMessage = 'Должно быть от 2 до 30 символов';
    }
    showError(input, errorMessage);
    return false;
  }

  if (input.name === 'name' || input.name === 'description' || input.name === 'place-name') {
    if (!inputpattern(input.value)) {
      showError(input, 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы');
      return false;
    }
  }

  if (input.name === 'link' && !input.validity.valid) {
    showError(input, 'Введите корректный URL');
    return false;
  }

  hideError(input);
  return true;
}

function toggleButtonState(form, button, isValid) {
  if (isValid) {
    button.removeAttribute('disabled');
    button.classList.remove('popup__button_disabled');
  } else {
    button.setAttribute('disabled', true);
    button.classList.add('popup__button_disabled');
  }
}

function setEventListeners(form, validationConfig) {
  const inputs = Array.from(form.querySelectorAll(validationConfig.inputSelector));
  const submitButton = form.querySelector(validationConfig.submitButtonSelector);

  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      const isValid = checkInputValidity(input);
      toggleButtonState(form, submitButton, form.checkValidity());
    });
  });

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    clearValidation(form, validationConfig);
  });
}

function enableValidation(validationConfig) {
  const forms = Array.from(document.querySelectorAll(validationConfig.formSelector));
  forms.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      clearValidation(form, validationConfig);
    });
    setEventListeners(form, validationConfig);
  });
}

function clearValidation(form) {
  const inputs = Array.from(form.querySelectorAll('.popup__input'));
  const submitButton = form.querySelector('.popup__button');

  inputs.forEach((input) => {
    hideError(input);
  });

  toggleButtonState(form, submitButton, false);

  // Сброс состояния валидации формы 
  // !!!!!!!!!!!!!!!!!!!!!!!!!!! нужно сделать ресет только для формы новой карточки 
  // form.reset();
}

export {
  enableValidation,
  clearValidation
};