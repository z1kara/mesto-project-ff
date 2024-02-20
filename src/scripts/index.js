
import "../pages/index.css"
import { initialCards } from "./cards";
// @todo: Темплейт карточки

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

//картинка
// const avatar = new URL('../images/avatar.jpg', import.meta.url);
// // // const jamesImage = new URL('./images/james.jpg', import.meta.url);
// // // const bryantImage = new URL('./images/bryant.jpg', import.meta.url)

// const whoIsTheGoat = [
//   // меняем исходные пути на переменные
//   { name: 'page_avatar', link: avatar },
// ];

// профайл едит
document.querySelector('.profile__edit-button').addEventListener('click', function(){
  const editPopup = document.querySelector('.popup_type_edit');
  editPopup.classList.add('popup_is-opened');
})

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