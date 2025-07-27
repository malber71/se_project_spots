import "../pages/index.css";

import {
  enableValidation,
  validationConfig,
  resetValidation,
  disableButton,
} from "../scripts/validation.js";

import Api from "../utils/Api.js";

import logoSrc from "../images/logo.svg";

const logoImage = document.getElementById("image-logo");
logoImage.src = logoSrc;

import avatarSrc from "../images/avatar.jpg";

const avatarImage = document.getElementById("image-avatar");
// avatarImage.src = avatarSrc;

import pencilLtSrc from "../images/pencil-light.svg";

const pencilLtImage = document.getElementById("image-pencil-light");
pencilLtImage.src = pencilLtSrc;

import pencilSrc from "../images/pencil.svg";

const pencilImage = document.getElementById("image-pencil");
pencilImage.src = pencilSrc;

import plusSrc from "../images/plus.svg";

const plusImage = document.getElementById("image-plus");
plusImage.src = plusSrc;

import closeSrc from "../images/close-icon.png";

const closeImage = document.getElementById("image-close");
closeImage.src = closeSrc;

const addCloseImage = document.getElementById("image-preview-close-btn");
addCloseImage.src = closeSrc;

const prevCloseImage = document.getElementById("image-add-close");
prevCloseImage.src = closeSrc;



// const initialCards = [
//   {
//     name: "Val Thorens",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
//   {
//     name: "Restaurant terrace",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
//   },
//   {
//     name: "An outdoor cafe",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
//   },
//   {
//     name: "A very long bridge, over the forest and through the trees",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
//   },
//   {
//     name: "Tunnel with morning light",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
//   },
//   {
//     name: "Mountain house",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
// ];

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "354029a0-1df6-4418-8b39-f7f79d3ba100",
    "Content-Type": "application/json",
  },
});

avatarImage.alt = "Profile image loading...";

api.getAppInfo().then(([initialCards, userInfo]) => {
  console.log(initialCards);
    initialCards.forEach((item) => {
      const cardElement = getCardElement(item);
      cardsList.append(cardElement);
    });
    console.log(userInfo);
    console.log(userInfo.name);
    console.log(userInfo.about);
    console.log(userInfo.avatar);
    avatarImage.src = userInfo.avatar;
    avatarImage.alt = userInfo.name;
    profileName.textContent = userInfo.name;
    profileDesc.textContent = userInfo.about;
})
    .catch(console.error);

//profile-edit modal

const profileEditButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileDesc = document.querySelector(".profile__description");

const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfFormElement = editProfileModal.querySelector(".modal__form");
const editProfCloseModalBtn =
  editProfileModal.querySelector(".modal__close-btn");
const editModalNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editModalDescInput = editProfileModal.querySelector(
  "#profile-description-input"
);

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscClose);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscClose);
}

profileEditButton.addEventListener("click", function () {
  editModalNameInput.value = profileName.textContent;
  editModalDescInput.value = profileDesc.textContent;
  resetValidation(
    editProfileModal,
    [editModalNameInput, editModalDescInput],
    validationConfig
  );
  openModal(editProfileModal);
});

editProfCloseModalBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});

editProfFormElement.addEventListener("submit", function (evt) {
  evt.preventDefault();
  api
  .editUserInfo({name: editModalNameInput.value, about: editModalDescInput.value})
  .then((data) => {
  profileName.textContent = data.name;
  profileDesc.textContent = data.about;
  closeModal(editProfileModal);
  })
  .catch(console.error);

});

//new-post modal

const editNewPostBtn = document.querySelector(".profile__add-button");
const editNewPostModal = document.querySelector("#new-post-modal");
const editNewPostCloseBtn = editNewPostModal.querySelector(".modal__close-btn");
const editNewPostElement = editNewPostModal.querySelector(".modal__form");
const editNewPostSubmitButton =
  editNewPostModal.querySelector(".modal__submit-btn");

const editLinkInput = editNewPostModal.querySelector("#card-image-input");
const editCaptionInput = editNewPostModal.querySelector("#card-caption-input");

editNewPostBtn.addEventListener("click", function () {
  openModal(editNewPostModal);
});

editNewPostCloseBtn.addEventListener("click", function () {
  closeModal(editNewPostModal);
});

editNewPostElement.addEventListener("submit", function (evt) {
  evt.preventDefault();

  api
.editCardInfo({name: editCaptionInput.value, link: editLinkInput.value})
.then((data) =>{
  const newCard = {
    name: data.name,
    link: data.link,
  };
    const cardElement = getCardElement(newCard);
  cardsList.prepend(cardElement); // adds the new card to the beginning of the list

  closeModal(editNewPostModal);
  disableButton(editNewPostSubmitButton, validationConfig);
  editNewPostElement.reset();
})
.catch(console.error);
});

// editNewPostCloseBtn.addEventListener("click", function () {
//   closeModal(editNewPostModal);
// });


// Avatar modal

const avatarModalBtn = document.querySelector(".profile__avatar-btn");
const avatarModal = document.querySelector("#avatar-modal");
const avatarModalCloseBtn = avatarModal.querySelector(".modal__close-btn");
const avatartElement = avatarModal.querySelector(".modal__form");
const avatarSubmitButton =
  avatarModal.querySelector(".modal__submit-btn");
const avatarInput = avatarModal.querySelector("#edit-avatar-form");

const avatarCloseImage = document.getElementById("avatar-image-close");
avatarCloseImage.src = closeSrc;


avatarModalBtn.addEventListener("click", function () {
  openModal(avatarModal);
});


//preview modal variables

const previewModal = document.querySelector("#preview-modal");
const previewModalCloseBtn = previewModal.querySelector(".modal__close-btn");
const previewModalImageEl = previewModal.querySelector(".modal__preview-image");
const previewModalCaptionEl = previewModal.querySelector(
  ".modal__preview-caption"
);

//card iteration scripts

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

const cardsList = document.querySelector(".cards__list");

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardNameEl = cardElement.querySelector(".card__title");
  cardNameEl.textContent = data.name;

  const cardImageEl = cardElement.querySelector(".card__image");
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;

  //like button

  const cardLikeBtnEL = cardElement.querySelector(".card__like-button");
  cardLikeBtnEL.addEventListener("click", () => {
    cardLikeBtnEL.classList.toggle("card__like-button_liked");
  });

  const cardDeleteBtnEl = cardElement.querySelector(".card__delete-button");

  //delete button

  cardDeleteBtnEl.addEventListener("click", () => {
    cardElement.remove();
  });

  //preview modal

  cardImageEl.addEventListener("click", () => {
    previewModalImageEl.src = data.link;
    previewModalImageEl.alt = data.name;
    previewModalCaptionEl.textContent = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

previewModalCloseBtn.addEventListener("click", () => {
  closeModal(previewModal);
});

// Add this function to handle clicks outside the modal
function handleModalClick(evt, modal) {
  if (evt.target === modal) {
    closeModal(modal);
  }
}

// Add event listeners for each modal
editProfileModal.addEventListener("click", (evt) => {
  handleModalClick(evt, editProfileModal);
});

editNewPostModal.addEventListener("click", (evt) => {
  handleModalClick(evt, editNewPostModal);
});

avatarModal.addEventListener("click", (evt) => {
  handleModalClick(evt, avatarModal);
});

previewModal.addEventListener("click", (evt) => {
  handleModalClick(evt, previewModal);
});

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

enableValidation(validationConfig);
