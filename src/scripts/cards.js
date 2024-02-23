import { placesList } from "./index";
//import modal
import { openImagePopup } from "./modal";

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// @todo: Функция создания карточки
function createCard(cardData, deleteCard, openImagePopup) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  cardImage.addEventListener("click", function () {
    openImagePopup(cardData.link, cardData.name);
  });

  likeButton.addEventListener("click", function () {
    toggleLike(likeButton);
  });

  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", function (event) {
      const currentCard = event.currentTarget.closest(".card");
      deleteCard(currentCard);
    });

  return cardElement;
}

function toggleLike(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

export { initialCards, deleteCard, createCard };
