

// @todo: Функция создания карточки


function createCard(cardData, deleteCard, userData , openImagePopup, toggleLike) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCount = cardElement.querySelector(".card__like-count");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  cardImage.addEventListener("click", function () {
    openImagePopup(cardData.link, cardData.name);
  });

  likeButton.addEventListener("click", function () {
    toggleLike(likeButton);
  
    const isLiked = likeButton.classList.contains("card__like-button_is-active");
    cardData.likes = updateLikesArray(cardData.likes, isLiked);
    updateLikeCount(likeCount, cardData.likes.length);
  });

  console.log(userData._id);

  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", function (event) {
      const currentCard = event.currentTarget.closest(".card");
      deleteCard(currentCard);
    });

  updateLikeCount(likeCount, cardData.likes.length);

  return cardElement;
}

// Функция для обновления массива лайков при нажатии на кнопку лайка
function updateLikesArray(likesArray, isLiked) {
  const userId = "currentUser"; // !!!надо заменить "currentUser" на реальный идентификатор пользователя

  // Проверяем, есть ли текущий пользователь в массиве лайков
  const userIndex = likesArray.findIndex((like) => like._id === userId);

  if (isLiked && userIndex === -1) {
    return [...likesArray, { _id: userId }];
  } else if (!isLiked && userIndex !== -1) {
    // Удаляем лайк, если он уже был поставлен
    return likesArray.filter((like) => like._id !== userId);
  }

  return likesArray;
}

// Функция для обновления отображаемого количества лайков
function updateLikeCount(likeCountElement, count) {
  likeCountElement.textContent = count.toString();
}


function toggleLike(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}



// @todo: Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

export {deleteCard, createCard, toggleLike };