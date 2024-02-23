

// @todo: Функция создания карточки


function createCard(cardData, deleteCard, openImagePopup, toggleLike) {
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

// Функция для добавления обработчика событий для лайка к карточке
function addLikeButtonListener(cardElement, toggleLike) {
  const likeButton = cardElement.querySelector('.card__like-button');
  if (likeButton) {
    likeButton.addEventListener('click', function () {
      toggleLike(likeButton);
    });
  }
}

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

export {deleteCard, createCard, toggleLike, addLikeButtonListener };