import "../pages/index.css";

import { initialCards} from "./cards";

import {deleteCard, createCard, toggleLike } from "./card"

import { enableValidation, clearValidation } from "./validation";


import {
  openModal,
  closeModal
} from "./modal";

import {getUser, getInitialCards, editUser} from "./api"

// @todo: Темплейт карточки

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");
const newCardForm = document.querySelector(".popup_type_new-card")
const editForm = document.querySelector(".popup_type_edit");
const nameInput = editForm.querySelector(".popup__input_type_name");
const jobInput = editForm.querySelector(".popup__input_type_description");

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
    })
    .catch((error) => {
      console.error("Ошибка при обновлении user data:", error);
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

  const newCardData = {
    name: cardName,
    link: cardLink,
  };

  // Создаем новую карточку и добавляем её в начало контейнера
  const newCardElement = createCard(newCardData, deleteCard, openImagePopup, toggleLike);
  placesList.prepend(newCardElement);


  // Очищаем форму
  newCardFormElement.reset();
  clearValidation(newCardFormElement);
  closeModal(newCardForm);
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

// Обновленная функция для создания карточки и её рендера
function createCardAndRender(cardData) {
  const newCardElement = createCard(cardData, deleteCard, function () {
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

    // Рендерим начальные карточки
    initialCardsData.forEach((card) => {
      createCardAndRender(card);
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
};