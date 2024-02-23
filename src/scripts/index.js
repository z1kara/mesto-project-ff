import "../pages/index.css";

import { initialCards} from "./cards";

import {deleteCard, createCard } from "./card"

import {
  openPopup,
  openImagePopup,
  openEditProfilePopup,
  handleFormSubmit,
  handleNewCardSubmit,
  
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
