import "../pages/index.css";

import { initialCards} from "./cards";

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
const editForm = document.querySelector(".popup_type_edit");
const confirmForm = document.querySelector(".popup_type_confirm")
const editAvatarForm = document.querySelector(".popup_edit_avatar");
const nameInput = editForm.querySelector(".popup__input_type_name");
const jobInput = editForm.querySelector(".popup__input_type_description");

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

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__error',
  errorClass: 'popup__error_visible'
});



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

  openModal(editForm);
}

//submit edit profile

function handleEditFormSubmit(evt) {
  evt.preventDefault();

  const newName = nameInput.value;
  const newJob = jobInput.value;

  const saveButton = editForm.querySelector('.popup__button');
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

      closeModal(editForm);
      saveButton.textContent = 'Сохранить';
    })
    .catch((error) => {
      console.error("Ошибка при обновлении user data:", error);
      saveButton.textContent = 'Сохранить';
    });
  
}


  // const newName = nameInput.value;
  // const newJob = jobInput.value;
  // const profileTitle = document.querySelector(".profile__title");
  // const profileDescription = document.querySelector(".profile__description");

  // // // Вставляем новые значения с помощью textContent
  // // profileTitle.textContent = newName;
  // // profileDescription.textContent = newJob;

  // editUser ({ name: newName, about: newJob })
  // .then((data)=>{
  //   profileTitle.textContent = data.name;
  //   profileDescription.textContent = data.about;
  // })
  // .catch((err) => console.log(err));
  // closeModal(editForm);
//}

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
      clearValidation(newCardFormElement);
      closeModal(newCardForm);

      saveButton.textContent = 'Сохранить';
    })
    .catch((error) => {
      console.error("Ошибка при создании новой карточки:", error);
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
   //cardId в форме подтверждения для след использования
  // const formConfirm = document.getElementById("formConfirm");
  confirmForm.addEventListener("submit", (evt)=>{
    evt.preventDefault();
    handleConfirmSubmit(cardElement, cardId);
  });
  // formConfirm.setAttribute("data-card-id", cardId);
  
  openModal(confirmForm);
}

//submit confirm
function handleConfirmSubmit (cardElement, cardId){
  // const formConfirm = document.getElementById("formConfirm");
  // const cardId = formConfirm.getAttribute("data-card-id");
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
      closeModal(confirmForm);
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

    saveButton.textContent = 'Сохранить';
  })
  .catch((error) => {
    console.error('Ошибка при обновлении аватара:', error);
    saveButton.textContent = 'Сохранить';
  });
});


//вызов попапов
document
  .querySelector(".profile__edit-button")
  .addEventListener("click", openEditProfilePopup);

document
  .querySelector(".profile__add-button")
  .addEventListener("click", function () {
    openModal(newCardForm);
  });

// Прикрепляем обработчик к форме
editForm.addEventListener("submit", handleEditFormSubmit);

newCardFormElement.addEventListener("submit", handleNewCardSubmit);

document.querySelector('.profile__avatar_container').addEventListener('click', function () {
  openModal(document.querySelector('.popup_edit_avatar'));
});

// confirmForm.addEventListener("submit", handleConfirmSubmit);

// Обновленная функция для создания карточки и её рендера
function createCardAndRender(cardData,userData) {
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
      createCardAndRender(card,userData);
    });
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

export {
  placesList,
  nameInput,
  jobInput,
  newCardFormElement,
  cardNameInput,
  cardLinkInput,
  openDeleteConfirmationPopup,
};