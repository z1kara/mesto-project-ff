import {
  nameInput,
  jobInput,
  newCardFormElement,
  cardNameInput,
  cardLinkInput,
  placesList,
} from "./index.js";

import { createCard, deleteCard } from "./card.js";

// Общая функция для открытия попапа
function openModal(popupElement) {
  popupElement.classList.add("popup_is-opened");

  // Обработчик закрытия при клике на крестик
  const closeButton = popupElement.querySelector(".popup__close");
  closeButton.addEventListener("click", function () {
    closeModal(popupElement);
  });

  // Обработчик закрытия кликом на фон
  popupElement.addEventListener("click", function (event) {
    if (event.target === popupElement) {
      closeModal(popupElement);
    }
  });

  // Обработчик закрытия при нажатии клавиши Esc
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeModal(popupElement);
    }
  });
}

// Общая функция для закрытия попапа
function closeModal(popupElement) {
  popupElement.classList.remove("popup_is-opened");
  const closeButton = popupElement.querySelector(".popup__close");
  closeButton.removeEventListener("click", closeModal);
  popupElement.removeEventListener("click", closeModal);
  document.removeEventListener("keydown", closeModal);
}



export {
  openModal,
  closeModal
};
