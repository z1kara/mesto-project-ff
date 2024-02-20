
import "../pages/index.css"
import { initialCards } from "./cards";
// @todo: Темплейт карточки

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');


// Общая функция для открытия попапа
function openPopup(popupSelector) {
  const popup = document.querySelector(popupSelector);
  popup.classList.add('popup_is-opened');

  // Обработчик закрытия при клике на крестик
  const closeButton = popup.querySelector('.popup__close');
  closeButton.addEventListener('click', function() {
    closePopup(popup);
  });

  // Обработчик закрытия кликом на фон
  popup.addEventListener('click', function(event) {
    if (event.target === popup) {
      closePopup(popup);
    }
  });

  // Обработчик закрытия при нажатии клавиши Esc
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      closePopup(popup);
    }
  });
}


// Общая функция для закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  const closeButton = popup.querySelector('.popup__close');
  closeButton.removeEventListener('click', closePopup);
  popup.removeEventListener('click', closePopup);
  document.removeEventListener('keydown', closePopup);
}


document.querySelector('.profile__edit-button').addEventListener('click', function(){
  openPopup('.popup_type_edit');
});

document.querySelector('.profile__add-button').addEventListener('click', function(){
  openPopup('.popup_type_new-card');
});

// const overlay = document.querySelector('popup_is-opened');
// overlay.addEventListener('click', function(event) {
//   // Проверяем, что клик произошел именно на оверлее
//   if (event.target === overlay) {
//     editPopup.classList.remove('popup_is-opened');
//   }
// });


// @todo: Функция создания карточки
function createCard(cardData,deleteCard){
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;

  cardElement.querySelector('.card__delete-button').addEventListener('click', function (event){
    const currentCard = event.currentTarget.closest('.card');
    deleteCard(currentCard);
  })
  return cardElement;
}
// @todo: Функция удаления карточки
function deleteCard(cardElement) {
   cardElement.remove()
}
// @todo: Вывести карточки на страницу
function renderCards(cardsArray, deleteCard) {
  cardsArray.forEach(function (card) {
    const newCard = createCard(card, deleteCard); 
    placesList.appendChild(newCard);
  });
}

renderCards(initialCards, deleteCard);


// const formElement = document.querySelector('.popup__form');

// const nameInput = formElement.querySelector('.popup__input_type_name');
// const jobInput = formElement.querySelector('.popup__input_type_description');

// function handleFormSubmit(evt) {
//   evt.preventDefault();
//   const nameValue = nameInput.value;
//   const jobValue = jobInput.value;

//   // Выберите элементы, куда должны быть вставлены значения полей (например, элементы для вывода значений)
//   const nameOutputElement = document.querySelector('.output__name');
//   const jobOutputElement = document.querySelector('.output__job');

//   // Вставьте новые значения с помощью textContent
//   nameOutputElement.textContent = nameValue;
//   jobOutputElement.textContent = jobValue;
// }


// formElement.addEventListener('submit', handleFormSubmit);