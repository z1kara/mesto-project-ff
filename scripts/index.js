// @todo: Темплейт карточки

// @todo: DOM узлы
const placesList = document.querySelector('.places__list')
// @todo: Функция создания карточки
function createCard(cardData,deleteCard){
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', function (){
    deleteCard(cardElement);
  })
  return cardElement;
}
// @todo: Функция удаления карточки
function deleteCard(cardData) {
  const cardElement = document.querySelector('.card'); 
  cardElement.parentNode.removeChild(cardElement);
}
// @todo: Вывести карточки на страницу
function renderCards(cardsArray, deleteCard) {
  cardsArray.forEach(function (card) {
    const newCard = createCard(card, deleteCard); 
    placesList.appendChild(newCard);
  });
}

renderCards(initialCards, deleteCard);