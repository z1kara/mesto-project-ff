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
function openPopup(popupSelector) {
  const popup = document.querySelector(popupSelector);
  popup.classList.add("popup_is-opened");

  // Обработчик закрытия при клике на крестик
  const closeButton = popup.querySelector(".popup__close");
  closeButton.addEventListener("click", function () {
    closePopup(popup);
  });

  // Обработчик закрытия кликом на фон
  popup.addEventListener("click", function (event) {
    if (event.target === popup) {
      closePopup(popup);
    }
  });

  // Обработчик закрытия при нажатии клавиши Esc
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closePopup(popup);
    }
  });
}

// Общая функция для закрытия попапа
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  const closeButton = popup.querySelector(".popup__close");
  closeButton.removeEventListener("click", closePopup);
  popup.removeEventListener("click", closePopup);
  document.removeEventListener("keydown", closePopup);
}



export {
  openPopup,
  closePopup
};
