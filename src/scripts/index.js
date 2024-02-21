
import "../pages/index.css"
import { initialCards } from "./cards";
// @todo: Темплейт карточки

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
const formElement  = document.querySelector('.popup_type_edit .popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');

//dom для новой карточки
const newCardFormElement = document.querySelector('.popup_type_new-card .popup__form');
const cardNameInput = newCardFormElement.querySelector('.popup__input_type_card-name');
const cardLinkInput = newCardFormElement.querySelector('.popup__input_type_url');

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



//edit profile 
function openEditProfilePopup() {
  // Получите значения полей из соответствующих элементов на странице
 

  const currentName = document.querySelector('.profile__title').textContent;
  const currentDescription = document.querySelector('.profile__description').textContent;

  // Заполните поля в попапе текущими значениями
  nameInput.value = currentName;
  jobInput.value = currentDescription;

  openPopup('.popup_type_edit');
}





//вызов попапов
document.querySelector('.profile__edit-button').addEventListener('click', openEditProfilePopup);

document.querySelector('.profile__add-button').addEventListener('click', function(){
  openPopup('.popup_type_new-card');
});




//submit edit profile

function handleFormSubmit(evt) {
  evt.preventDefault(); 

  const newName = nameInput.value;
  const newJob = jobInput.value;
  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');

  // Вставляем новые значения с помощью textContent
  profileTitle.textContent = newName;
  profileDescription.textContent = newJob;

  closePopup(document.querySelector('.popup_type_edit'));
}

// Прикрепляем обработчик к форме
formElement.addEventListener('submit', handleFormSubmit);






//Обработчик формы для новой карточки

function handleNewCardSubmit(evt) {
  evt.preventDefault(); 
  const cardName = cardNameInput.value;
  const cardLink = cardLinkInput.value;

  const newCardData = {
    name: cardName,
    link: cardLink
  };

// Создаем новую карточку и добавляем её в начало контейнера
  const newCardElement = createCard(newCardData, deleteCard, openImagePopup);
  placesList.prepend(newCardElement);

  // Очищаем форму
  newCardFormElement.reset();

  closePopup(document.querySelector('.popup_type_new-card'));
}

newCardFormElement.addEventListener('submit', handleNewCardSubmit);



// @todo: Функция создания карточки
function createCard(cardData,deleteCard,openImagePopup){
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const likeButton = cardElement.querySelector('.card__like-button');
  
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;

  cardImage.addEventListener('click', function () {
    openImagePopup(cardData.link);
  });

  likeButton.addEventListener('click', function () {
    toggleLike(likeButton);
  });

  cardElement.querySelector('.card__delete-button').addEventListener('click', function (event){
    const currentCard = event.currentTarget.closest('.card');
    deleteCard(currentCard);
  })

  return cardElement;
}

function toggleLike(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
   cardElement.remove()
}
// @todo: Вывести карточки на страницу
function renderCards(cardsArray, deleteCard) {
  cardsArray.forEach(function (card) {
    const newCard = createCard(card, deleteCard, function () {
      openImagePopup(card.link, card.caption);
    }); 
    placesList.appendChild(newCard);
  });
}

renderCards(initialCards, deleteCard);


//открытие попапа с изображением

function openImagePopup(imageUrl, captionText) {
  const imagePopup = document.querySelector('.popup_type_image');
  const imageElement = imagePopup.querySelector('.popup__image');
  const captionElement = imagePopup.querySelector('.popup__caption');
  
  imageElement.src = imageUrl;
  imageElement.alt = 'Image';
  captionElement.textContent = captionText; 
  openPopup('.popup_type_image');
}