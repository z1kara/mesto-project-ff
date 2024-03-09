
import {
  openDeleteConfirmationPopup
} from "./index.js";

import {
  putLike, deleteLike
} from "./api.js";
// @todo: Функция создания карточки


function createCard(cardData, deleteCard, userData , openImagePopup, toggleLike) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCount = cardElement.querySelector(".card__like-count");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  // Установите начальное состояние лайка
  const isLikedByCurrentUser = cardData.likes.some(
    (like) => like._id === userData._id
  );
  if (isLikedByCurrentUser) {
    likeButton.classList.add("card__like-button_is-active");
  }

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  cardImage.addEventListener("click", function () {
    openImagePopup(cardData.link, cardData.name);
  });

  likeButton.addEventListener("click", function () {
    toggleLike(likeButton);

    const isLiked = likeButton.classList.contains("card__like-button_is-active");
    updateLikeCount(likeCount, cardData.likes.length);

    if (isLiked) {
      putLike(cardData._id)
        .then((updatedCardData) => {
          updateLikeCount(likeCount, updatedCardData.likes.length);
        })
        .catch((error) => {
          console.error("Ошибка при постановке лайка:", error);
        });
    } else {
      deleteLike(cardData._id)
        .then((updatedCardData) => {
          updateLikeCount(likeCount, updatedCardData.likes.length);
        })
        .catch((error) => {
          console.error("Ошибка при снятии лайка:", error);
        });
    }
  });


  if (userData._id === cardData.owner._id){
    const cardElement = deleteButton.closest(".card")
    deleteButton.addEventListener("click", handleDeleteCard);
      // .addEventListener("click", function () {
      //   openDeleteConfirmationPopup(cardData._id);
      // });
  } else {
    // Если не владелец, скрываем иконку удаления
    deleteButton.remove();
  }

  function handleDeleteCard (){
    const cardElement = deleteButton.closest(".card")
    deleteCard(cardElement, cardData._id)
  }

  updateLikeCount(likeCount, cardData.likes.length);

  return cardElement;
}

// Функция для обновления отображаемого количества лайков
function updateLikeCount(likeCountElement, count) {
  likeCountElement.textContent = count.toString();
}


function toggleLike(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}


// Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}


export { createCard, toggleLike, deleteCard};