const validationConfig = {
  formSelector: ".popup__form",

  inputSelector: ".popup__input",

  submitButtonSelector: ".popup__button",

  inactiveButtonClass: "popup__button_disabled",

  inputErrorClass: "popup__error",

  errorClass: "popup__error_visible",
};

function inputpattern(str) {
  const pattern = /^[A-Za-zА-Яа-яЁё\s\-]+$/;

  return pattern.test(str);
}

function showError(input, errorMessage, validationConfig) {
  const errorElement = document.getElementById(`${input.name}-error`);

  errorElement.textContent = errorMessage;

  errorElement.classList.add(validationConfig.errorClass);
}

function hideError(input, validationConfig) {
  const formElement = input.closest(validationConfig.formSelector);

  if (formElement) {
    const errorElement = document.getElementById(`${input.name}-error`);

    if (errorElement) {
      errorElement.textContent = "";

      errorElement.classList.remove(validationConfig.errorClass);
    }
  }
}

function checkInputValidity(input, validationConfig) {
  if (input.validity.valueMissing) {
    showError(input, "Это обязательное поле", validationConfig);

    return false;
  }

  if (input.validity.tooShort || input.validity.tooLong) {
    let errorMessage;

    if (input.name === "name") {
      errorMessage = "Должно быть от 2 до 40 символов";
    } else if (input.name === "description") {
      errorMessage = "Должно быть от 2 до 200 символов";
    } else if (input.name === "place-name") {
      errorMessage = "Должно быть от 2 до 30 символов";
    }

    showError(input, errorMessage, validationConfig);

    return false;
  }

  if (
    input.name === "name" ||
    input.name === "description" ||
    input.name === "place-name"
  ) {
    if (!inputpattern(input.value)) {
      showError(
        input,
        "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы",
        validationConfig
      );

      return false;
    }
  }

  if (input.name === "avatar-link" && !input.validity.valid) {
    showError(input, "Введите корректный URL", validationConfig);

    return false;
  }

  if (input.name === "link" && !input.validity.valid) {
    showError(input, "Введите корректный URL", validationConfig);

    return false;
  }

  hideError(input, validationConfig);

  return true;
}

function toggleButtonState(form, button, isValid, validationConfig) {
  button.disabled = !isValid; 
  
  if (isValid) {
    button.classList.remove(validationConfig.inactiveButtonClass);
  } else {
    button.classList.add(validationConfig.inactiveButtonClass);
  }
}

function setEventListeners(form, validationConfig) {
  const inputs = Array.from(
    form.querySelectorAll(validationConfig.inputSelector)
  );

  const submitButton = form.querySelector(
    validationConfig.submitButtonSelector
  );

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      const isValid = checkInputValidity(input, validationConfig);

      toggleButtonState(
        form,
        submitButton,
        form.checkValidity(),
        validationConfig
      );
    });
  });

  form.addEventListener("submit", (evt) => {
    evt.preventDefault();

    clearValidation(form, validationConfig);
  });
}

function enableValidation(validationConfig) {
  const forms = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );

  forms.forEach((form) => {
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();

      clearValidation(form, validationConfig);
    });

    setEventListeners(form, validationConfig);
  });
}

function clearValidation(form, validationConfig) {
  const inputs = Array.from(
    form.querySelectorAll(validationConfig.inputSelector)
  );

  const submitButton = form.querySelector(
    validationConfig.submitButtonSelector
  );

  inputs.forEach((input) => {
    hideError(input, validationConfig);
  });

  toggleButtonState(form, submitButton, false, validationConfig);
}

export { enableValidation, clearValidation, validationConfig };
