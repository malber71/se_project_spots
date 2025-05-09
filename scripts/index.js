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
    settings
  );
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

  const newCard = {
    name: editCaptionInput.value,
    link: editLinkInput.value,
  };

  const cardElement = getCardElement(newCard);
  cardsList.prepend(cardElement); // adds the new card to the beginning of the list

  closeModal(editNewPostModal);
  disableButton(editNewPostSubmitButton, settings);
  editNewPostElement.reset(); // clears the form
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

  previewModalCloseBtn.addEventListener("click", () => {
    closeModal(previewModal);
  });

  return cardElement;
}

initialCards.forEach(function (item) {
  const cardElement = getCardElement(item);
  cardsList.append(cardElement);
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

previewModal.addEventListener("click", (evt) => {
  handleModalClick(evt, previewModal);
});

function handleEscClose(evt) {
  if (event.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}
