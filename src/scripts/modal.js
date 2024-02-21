import {
  nameInput,
  jobInput,
  newCardFormElement,
  cardNameInput,
  cardLinkInput,
  placesList,
} from "./index.js";

import { createCard, deleteCard } from "./cards.js";

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

export {
  openPopup,
  openEditProfilePopup,
  handleFormSubmit,
  handleNewCardSubmit,
  openImagePopup,
};
