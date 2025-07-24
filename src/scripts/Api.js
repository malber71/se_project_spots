class Api {
  constructor(options) {
    // constructor body
  }

  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
  headers: {
    authorization: "354029a0-1df6-4418-8b39-f7f79d3ba100"
  }
})
  .then(res => res.json())
  }

  // other methods for working with the API
}

export default Api;