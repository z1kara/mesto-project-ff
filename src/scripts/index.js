import "../pages/index.css";

import { initialCards} from "./cards";

import {deleteCard, createCard } from "./card"

import {
  openPopup,
  closePopup
} from "./modal";

// @todo: Темплейт карточки

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");
const editForm = document.querySelector(".popup_type_edit .popup__form");
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

  openPopup(".popup_type_edit");
}

//submit edit profile

function handleFormSubmit(evt) {
  evt.preventDefault();

  const newName = nameInput.value;
  const newJob = jobInput.value;
  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");

  // Вставляем новые значения с помощью textContent
  profileTitle.textContent = newName;
  profileDescription.textContent = newJob;

  closePopup(document.querySelector(".popup_type_edit"));
}

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
  const newCardElement = createCard(newCardData, deleteCard, openImagePopup);
  placesList.prepend(newCardElement);

  // Очищаем форму
  newCardFormElement.reset();

  closePopup(document.querySelector(".popup_type_new-card"));
}

//открытие попапа с изображением

function openImagePopup(imageUrl, captionText) {
  const imagePopup = document.querySelector(".popup_type_image");
  const imageElement = imagePopup.querySelector(".popup__image");
  const captionElement = imagePopup.querySelector(".popup__caption");

  imageElement.src = imageUrl;
  imageElement.alt = "Image";
  captionElement.textContent = captionText;
  openPopup(".popup_type_image");
}

//вызов попапов
document
  .querySelector(".profile__edit-button")
  .addEventListener("click", openEditProfilePopup);

document
  .querySelector(".profile__add-button")
  .addEventListener("click", function () {
    openPopup(".popup_type_new-card");
  });

// Прикрепляем обработчик к форме
editForm.addEventListener("submit", handleFormSubmit);

newCardFormElement.addEventListener("submit", handleNewCardSubmit);

// @todo: Вывести карточки на страницу
function renderCards(cardsArray, deleteCard) {
  cardsArray.forEach(function (card) {
    const newCard = createCard(card, deleteCard, function () {
      openImagePopup(card.link, card.name);
    });
    placesList.appendChild(newCard);
  });
}

renderCards(initialCards, deleteCard);

export {
  placesList,
  nameInput,
  jobInput,
  newCardFormElement,
  cardNameInput,
  cardLinkInput,
};
