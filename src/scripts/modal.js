import {
  nameInput,
  jobInput,
  newCardFormElement,
  cardNameInput,
  cardLinkInput,
  placesList,
} from "./index.js";

import { createCard, deleteCard } from "./card.js";

import { clearValidation } from "./validation";

// Общая функция для открытия попапа
function openModal(popupElement) {
  popupElement.classList.add("popup_is-opened");

  popupElement.addEventListener("click", closePopupByOverlay);

  document.addEventListener("keydown", closePopupByEsc);
}

// Общая функция для закрытия попапа
function closeModal(popupElement) {
  popupElement.classList.remove("popup_is-opened");
  
  // Удаляем обработчики событий
  popupElement.removeEventListener("click", closePopupByOverlay);
  document.removeEventListener("keydown", closePopupByEsc);

  if (popupElement.querySelector('.popup__form')) {
    clearValidation(popupElement.querySelector('.popup__form'));
  }
}

function closePopupByOverlay(event) {
  if (event.target === event.currentTarget) {
    const popupElement = event.currentTarget;
    closeModal(popupElement);
  }
}

function closePopupByEsc(event) {
  if (event.key === "Escape") {
    const popupElement = document.querySelector(".popup_is-opened");
    closeModal(popupElement);
  }
}

export {
  openModal,
  closeModal
};
