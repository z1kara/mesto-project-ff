import "../pages/index.css";


import { createCard, toggleLike } from "./card"

import { enableValidation, clearValidation } from "./validation";


import {
  openModal,
  closeModal
} from "./modal";

import {getUser, getInitialCards, editUser, createNewCardApi, deleteCardApi, editAvatar} from "./api"

// @todo: Темплейт карточки

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");
const newCardForm = document.querySelector(".popup_type_new-card")
const formEditProfile = document.querySelector(".popup_type_edit");
const confirmForm = document.querySelector(".popup_type_confirm")
const editAvatarForm = document.querySelector(".popup_edit_avatar");
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(".popup__input_type_description");

//avatar
const profileAvatar = document.querySelector(".profile__image")

//dom для новой карточки
const newCardFormElement = document.querySelector(
  ".popup_type_new-card .popup__form"
);
const cardNameInput = newCardFormElement.querySelector(
  ".popup__input_type_card-name"
);
const cardLinkInput = newCardFormElement.querySelector(
  ".popup__input_type_url"
);

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__error',
  errorClass: 'popup__error_visible'
};

enableValidation (validationConfig);


//закрытие попапа на кнопку
const closeButtons = document.querySelectorAll(".popup__close");
closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const popupElement = button.closest(".popup");
    closeModal(popupElement);
  });
});

//edit profile
function openEditProfilePopup() {
  // Получите значения полей из соответствующих элементов на странице

  const currentName = document.querySelector(".profile__title").textContent;
  const currentDescription = document.querySelector(
    ".profile__description"
  ).textContent;

  // Заполните поля в попапе текущими значениями
  nameInput.value = currentName;
  jobInput.value = currentDescription;

  openModal(formEditProfile);
}

//submit edit profile

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  const newName = nameInput.value;
  const newJob = jobInput.value;

  const saveButton = formEditProfile.querySelector('.popup__button');
  saveButton.textContent = 'Сохранение...';

  editUser({
    name: newName,
    about: newJob,
  })
    .then((userData) => {

      const profileTitle = document.querySelector(".profile__title");
      const profileDescription = document.querySelector(".profile__description");

      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;

      closeModal(formEditProfile);
    })
    .catch((error) => {
      console.error("Ошибка при обновлении user data:", error);
    })
    .finally(() => {
      saveButton.textContent = 'Сохранить';
    })
}

//Обработчик формы для новой карточки

function handleNewCardSubmit(evt) {
  evt.preventDefault();
  const cardName = cardNameInput.value;
  const cardLink = cardLinkInput.value;

  const saveButton = newCardForm.querySelector('.popup__button');
  saveButton.textContent = 'Сохранение...';

  const newCardData = {
    name: cardName,
    link: cardLink,
  };


  createNewCardApi(newCardData)
    .then((newCardData) => {
      const newCardElement = createCard(newCardData, openDeleteConfirmationPopup , newCardData.owner , openImagePopup, toggleLike);
      placesList.prepend(newCardElement);

      // Очищаем форму
      newCardFormElement.reset();
      closeModal(newCardForm);
    })
    .catch((error) => {
      console.error("Ошибка при создании новой карточки:", error);
    })
    .finally(() => {
      saveButton.textContent = 'Сохранить';
    });
}

//открытие попапа с изображением

function openImagePopup(imageUrl, captionText) {
  const imagePopup = document.querySelector(".popup_type_image");
  const imageElement = imagePopup.querySelector(".popup__image");
  const captionElement = imagePopup.querySelector(".popup__caption");

  imageElement.src = imageUrl;
  imageElement.alt = captionText;
  captionElement.textContent = captionText;
  openModal(imagePopup);
}

//попап подтверждения
function openDeleteConfirmationPopup(cardElement, cardId) {
  confirmForm.addEventListener("submit", (evt)=>{
    evt.preventDefault();
    handleConfirmSubmit(cardElement, cardId);
  });
  openModal(confirmForm);
}

//submit confirm
function handleConfirmSubmit (cardElement, cardId){
  deleteCardApi(cardId)
    .then(() => {
      // Успешное удаление карточки, удалите карточку из интерфейса
      // const cardElement = document.querySelector(`.card[data-card-id="${cardId}"]`);
      // deleteCard(cardElement);
      cardElement.remove();
      
      closeModal(confirmForm);
    })
    .catch((error) => {
      console.error("Ошибка при удалении карточки:", error);
    })
    .finally(() => {
      const submitButton = confirmForm.querySelector('.popup__button');
      submitButton.removeAttribute('disabled');
    });
}


//попап аватарки
editAvatarForm.addEventListener("submit", function (evt){
  evt.preventDefault();
  const avatarLinkInput = editAvatarForm.querySelector('.popup__input_type_url');
  const newAvatarLink = avatarLinkInput.value;

  const saveButton = editAvatarForm.querySelector('.popup__button');
  saveButton.textContent = 'Сохранение...';

  editAvatar(newAvatarLink)
  .then(() => {
    
    profileAvatar.style = `background-image: url('${newAvatarLink}');`

    closeModal(document.querySelector('.popup_edit_avatar'));
  })
  .catch((error) => {
    console.error('Ошибка при обновлении аватара:', error);
  })
  .finally(() => {
    saveButton.textContent = 'Сохранить';
  });
});


//вызов попапов
document
  .querySelector(".profile__edit-button")
  .addEventListener("click", function () {
    openEditProfilePopup();
    clearValidation(formEditProfile, validationConfig);
  });

document
  .querySelector(".profile__add-button")
  .addEventListener("click", function () {
    openModal(newCardForm);
    clearValidation(newCardForm, validationConfig);
  });

// Прикрепляем обработчик к форме
formEditProfile.addEventListener("submit", handleEditFormSubmit);

newCardFormElement.addEventListener("submit", handleNewCardSubmit);

document.querySelector('.profile__avatar_container').addEventListener('click', function () {
  openModal(editAvatarForm);
  const avatarLinkInput = document.querySelector('.popup_edit_avatar .popup__input_type_url');
  avatarLinkInput.value = '';
  clearValidation(editAvatarForm, validationConfig);
});

// confirmForm.addEventListener("submit", handleConfirmSubmit);

// Обновленная функция для создания карточки и её рендера
function addCard(cardData,userData) {
  const newCardElement = createCard(cardData, openDeleteConfirmationPopup , userData , function () {
    openImagePopup(cardData.link, cardData.name);
  }, toggleLike);
  placesList.prepend(newCardElement);
}

Promise.all([getUser(), getInitialCards()])
  .then(([userData, initialCardsData]) => {
    // Рендерим данные пользователя
    const profileTitle = document.querySelector(".profile__title");
    const profileDescription = document.querySelector(".profile__description");
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.style = `background-image: url('${userData.avatar}');`;

    // Рендерим начальные карточки нужно в реверсе чтобы отображалась моя 1 после обновления страницы
    initialCardsData.reverse().forEach((card) => {
      addCard(card,userData);
    });
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });