const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

//profile-edit modal

const profileEditButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileDesc = document.querySelector(".profile__description");

const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfFormElement = editProfileModal.querySelector(".modal__form");
const editProfCloseModalBtn = editProfileModal.querySelector(".modal__close-btn");
const editModalNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editModalDescInput = editProfileModal.querySelector(
  "#profile-description-input"
);

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

profileEditButton.addEventListener("click", function () {
  editModalNameInput.value = profileName.textContent;
  editModalDescInput.value = profileDesc.textContent;
  openModal(editProfileModal);
});

editProfCloseModalBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});

editProfFormElement.addEventListener("submit", function (evt) {
  evt.preventDefault();
  profileName.textContent = editModalNameInput.value;
  profileDesc.textContent = editModalDescInput.value;
  closeModal(editProfileModal);
});

//new-post modal

const editNewPostBtn = document.querySelector(".profile__add-button");
const editNewPostModal = document.querySelector("#new-post-modal");
const editNewPostCloseBtn = editNewPostModal.querySelector(".modal__close-btn");

const editNewPostElement = editNewPostModal.querySelector(".modal__form");
const editLinkInput = editNewPostModal.querySelector(
  "#card-image-input"
);
const editCaptionInput = editNewPostModal.querySelector(
  "#card-caption-input"
);

editNewPostBtn.addEventListener("click", function () {
  openModal(editNewPostModal);
});

editNewPostCloseBtn.addEventListener("click", function () {
  closeModal(editNewPostModal);
});




editNewPostElement.addEventListener("submit", function(evt) {
  evt.preventDefault()

  const newCard = {
    name: editCaptionInput.value,
    link: editLinkInput.value
  };
  
  const cardElement = getCardElement(newCard);
  cardsList.prepend(cardElement);  // adds the new card to the beginning of the list
  
  closeModal(editNewPostModal);
  editNewPostElement.reset();  // clears the form


});




//card iteration scripts

const cardTemplate = document.querySelector("#card-template").content.querySelector(".card");

const cardsList = document.querySelector(".cards__list");

function getCardElement(data) {
  const cardElement = cardTemplate
    .cloneNode(true);

  const cardNameEl = cardElement.querySelector(".card__title");
  cardNameEl.textContent = data.name;

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = data.link;
  cardImage.alt = data.name;

  return cardElement;
}

initialCards.forEach(function(item) {
  const cardElement = getCardElement(item);
  cardsList.append(cardElement);
});


