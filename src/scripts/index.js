import "../pages/index.css";

import { initialCards, renderCards, deleteCard } from "./cards";

import {
  openPopup,
  openEditProfilePopup,
  handleFormSubmit,
  handleNewCardSubmit,
} from "./modal";

// @todo: Темплейт карточки

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");
const formElement = document.querySelector(".popup_type_edit .popup__form");
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");

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
formElement.addEventListener("submit", handleFormSubmit);

newCardFormElement.addEventListener("submit", handleNewCardSubmit);

renderCards(initialCards, deleteCard);

export {
  placesList,
  nameInput,
  jobInput,
  newCardFormElement,
  cardNameInput,
  cardLinkInput,
};
