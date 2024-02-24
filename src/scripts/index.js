import "../pages/index.css";

import { initialCards} from "./cards";

import {deleteCard, createCard, toggleLike, addLikeButtonListener } from "./card"

import {
  openModal,
  closeModal
} from "./modal";

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
  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");

  // Вставляем новые значения с помощью textContent
  profileTitle.textContent = newName;
  profileDescription.textContent = newJob;

  closeModal(editForm);
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
  const newCardElement = createCard(newCardData, deleteCard, openImagePopup, toggleLike);
  placesList.prepend(newCardElement);

  // Добавляем обработчик события для лайка к новой карточке
  addLikeButtonListener(newCardElement, toggleLike);

  // Очищаем форму
  newCardFormElement.reset();

  closeModal(newCardForm);
}

//открытие попапа с изображением

function openImagePopup(imageUrl, captionText) {
  const imagePopup = document.querySelector(".popup_type_image");
  const imageElement = imagePopup.querySelector(".popup__image");
  const captionElement = imagePopup.querySelector(".popup__caption");

  imageElement.src = imageUrl;
  imageElement.alt = "Image";
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

// @todo: Вывести карточки на страницу
function renderCards(cardsArray, deleteCard, toggleLike) {
  cardsArray.forEach(function (card) {
    const newCard = createCard(card, deleteCard, function () {
      openImagePopup(card.link, card.name);
    }, toggleLike);
    placesList.appendChild(newCard);

    // Добавляем обработчик события для лайка для каждой существующей карточки
    addLikeButtonListener(newCard, toggleLike);
  });
}

renderCards(initialCards, deleteCard, toggleLike);

export {
  placesList,
  nameInput,
  jobInput,
  newCardFormElement,
  cardNameInput,
  cardLinkInput,
};
