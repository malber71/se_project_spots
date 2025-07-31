// imports and image declarations

import "../pages/index.css";

import {
  enableValidation,
  validationConfig,
  resetValidation,
  disableButton,
} from "../scripts/validation.js";

import Api from "../utils/Api.js";

import { setButtonText } from "../utils/helper.js";

import logoSrc from "../images/logo.svg";

const logoImage = document.getElementById("image-logo");
logoImage.src = logoSrc;

import avatarSrc from "../images/avatar.jpg";

const avatarImage = document.getElementById("image-avatar");

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

const closeImage = document.getElementById("profile-modal-image-close");
closeImage.src = closeSrc;

const addCloseImage = document.getElementById("image-add-close");
addCloseImage.src = closeSrc;

const deleteModalClose = document.getElementById("delete-modal-close-btn");
deleteModalClose.src = closeSrc;

import closeWhtSrc from "../images/close-icon-white.svg";

const prevCloseImage = document.getElementById("image-preview-close-btn");
prevCloseImage.src = closeWhtSrc;

const deleteCloseImage = document.getElementById("delete-modal-close-btn");
deleteCloseImage.src = closeWhtSrc;

// original initial cards kept for historical reference and
// available links for testing

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

api
  .getAppInfo()
  .then(([initialCards, userInfo]) => {
    initialCards.forEach((item) => {
      const cardElement = getCardElement(item);
      cardsList.append(cardElement);
    });

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

// Handle modal button text on closure

function submitCloser(buttonEvent, state, thingOne, thingTwo) {
  setTimeout(() => {
    setButtonText(buttonEvent, state, thingOne, thingTwo);
  }, 1000);
}

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

// edit Profile

editProfFormElement.addEventListener("submit", function (evt) {
  evt.preventDefault();

  setButtonText(evt.submitter, true);

  api
    .editUserInfo({
      name: editModalNameInput.value,
      about: editModalDescInput.value,
    })
    .then((data) => {
      profileName.textContent = data.name;
      profileDesc.textContent = data.about;
      closeModal(editProfileModal);
    })
    .catch(console.error)
    .finally(() => {
      submitCloser(evt.submitter, false);
    });
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

  setButtonText(evt.submitter, true);

  const captionInputLimiter = editCaptionInput.value.slice(0, 30);

  api
    .editCardInfo({ name: captionInputLimiter, link: editLinkInput.value })
    .then((data) => {
      const cardElement = getCardElement(data);
      cardsList.prepend(cardElement); // adds the new card to the beginning of the list

      closeModal(editNewPostModal);
      disableButton(editNewPostSubmitButton, validationConfig);
      editNewPostElement.reset();
    })
    .catch(console.error)
    .finally(() => {
      submitCloser(evt.submitter, false);
    });
});

// Avatar modal scripts

const avatarModalBtn = document.querySelector(".profile__avatar-btn");
const avatarModal = document.querySelector("#avatar-modal");
const avatarModalCloseBtn = avatarModal.querySelector(".modal__close-btn");
const avatarForm = avatarModal.querySelector(".modal__form");
const avatarSubmitButton = avatarModal.querySelector(".modal__submit-btn");
const avatarInput = avatarModal.querySelector("#profile-avatar-input");

const avatarCloseImage = document.getElementById("avatar-image-close");
avatarCloseImage.src = closeSrc;

avatarModalBtn.addEventListener("click", function () {
  openModal(avatarModal);
  disableButton(avatarSubmitButton, validationConfig);
});

avatarModalCloseBtn.addEventListener("click", function () {
  closeModal(avatarModal);
});

avatarForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  setButtonText(evt.submitter, true);

  api
    .editAvatarInfo(avatarInput.value)
    .then((data) => {
      avatarImage.src = data.avatar;
      closeModal(avatarModal);
      avatarForm.reset();
    })
    .catch(console.error)
    .finally(() => {
      submitCloser(evt.submitter, false);
    });
});

// delete modal

const deleteModal = document.querySelector("#delete-modal");
const deleteModalCloseBtn = deleteModal.querySelector(".modal__close-btn");
const deleteForm = deleteModal.querySelector(".modal__submit-btn_delete");
const deleteModalCancelBtn = deleteModal.querySelector(
  ".modal__submit-btn_delete_cancel"
);

deleteModalCloseBtn.addEventListener("click", function () {
  closeModal(deleteModal);
});

deleteModalCancelBtn.addEventListener("click", function () {
  closeModal(deleteModal);
});

deleteForm.addEventListener("click", function (evt) {
  handleDeleteSubmit(evt);
});

function handleDeleteSubmit(evt) {
  setButtonText(evt.target, true, "Delete", "Deleting...");

  api
    .removeCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch(console.error)
    .finally(() => {
      submitCloser(evt.target, false, "Delete", "Deleting...");
    });
}

//card iteration variables

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cardsList = document.querySelector(".cards__list");

//preview modal variables

const previewModal = document.querySelector("#preview-modal");
const previewModalCloseBtn = previewModal.querySelector(".modal__close-btn");
const previewModalImageEl = previewModal.querySelector(".modal__preview-image");
const previewModalCaptionEl = previewModal.querySelector(
  ".modal__preview-caption"
);

//card iteration scripts

let selectedCard;
let selectedCardId;

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardNameEl = cardElement.querySelector(".card__title");
  cardNameEl.textContent = data.name;
  const cardImageEl = cardElement.querySelector(".card__image");
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  const likeBtnState = data.isLiked;

  // card functionality

  function handleDeleteCard(cardElement, data) {
    selectedCard = cardElement;
    selectedCardId = data._id;
    openModal(deleteModal);
  }

  function handleLike(evt, data) {
    const id = data._id;

    if (data.isLiked) {
      data.isLiked = false;
    } else {
      data.isLiked = true;
    }

    api
      .handleLike(id, data.isLiked)
      .then(() => {
        evt.target.classList.toggle("card__like-button_liked");
      })
      .catch(console.error);
  }

  //like button

  const cardLikeBtnEL = cardElement.querySelector(".card__like-button");

  if (likeBtnState === true) {
    cardLikeBtnEL.classList.toggle("card__like-button_liked");
  }

  cardLikeBtnEL.addEventListener("click", (evt) => handleLike(evt, data));

  const cardDeleteBtnEl = cardElement.querySelector(".card__delete-button");

  //delete button

  cardDeleteBtnEl.addEventListener("click", () =>
    handleDeleteCard(cardElement, data)
  );

  //preview modal

  cardImageEl.addEventListener("click", () => {
    previewModalImageEl.src = data.link;
    previewModalImageEl.alt = data.name;
    previewModalCaptionEl.textContent = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

// handle clicks and escape key outside a modal

function handleModalClick(evt, modal) {
  if (evt.target === modal) {
    closeModal(modal);
  }
}

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

// Event listeners for each modal

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

deleteModal.addEventListener("click", (evt) => {
  handleModalClick(evt, deleteModal);
});

previewModalCloseBtn.addEventListener("click", () => {
  closeModal(previewModal);
});

// Enable validation

enableValidation(validationConfig);
