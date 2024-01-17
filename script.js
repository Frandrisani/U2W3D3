const sezioneSchede = document.getElementById("sezioneSchede");
const cartButton = document.getElementsByClassName("cartButton")[0];
const deleteButton = document.getElementsByClassName("deleteButton")[0];
const listaCart = document.getElementById("listaCart");
const cart = [];

sezioneSchede.addEventListener("click", function (event) {
  if (event.target.classList.contains("deleteButton")) {
    const cardToRemove = event.target.closest(".col-12");
    if (cardToRemove) {
      cardToRemove.classList.add("d-none");
    }
  }
});

sezioneSchede.addEventListener("click", function (event) {
  if (event.target.classList.contains("cartButton")) {
    const card = event.target.closest(".col-12");
    if (card) {
      const cardData = {
        title: card.querySelector(".card-title").textContent.trim(),
        price: card.querySelector(".card-title.fs-4").textContent.trim(),
        category: card.querySelector(".card-text.fs-6").textContent.trim(),
        asin: card.querySelector(".card-text.mt-0").textContent.trim(),
      };
      cart.push(cardData);
      console.log("Elemento aggiunto al carrello:", cardData);
      localStorage.setItem("cart", JSON.stringify(cart));

      // Pulisci la lista prima di aggiungere nuovi elementi
      listaCart.innerHTML = "";

      // Recupera il carrello dal localStorage
      const cartString = localStorage.getItem("cart");
      const cartFinale = JSON.parse(cartString);

      // Aggiungi gli elementi del carrello alla lista
      cartFinale.forEach((element) => {
        const nuovaRiga = document.createElement("li");
        nuovaRiga.classList.add("list-group-item");
        nuovaRiga.innerHTML = `
            ${element.title} - ${element.price} - ${element.category} - ${element.asin}
          `;
        listaCart.appendChild(nuovaRiga);
      });
    }
  }
});

const getBook = function () {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((response) => {
      console.log("response", response);
      if (response.ok) {
        return response.json();
      } else {
        if (response.status === 404) {
          throw new Error("404 - Pagina non trovata");
        } else if (response.status === 500) {
          throw new Error("500 - Internal server error");
        } else {
          throw new Error("Errore generico");
        }
      }
    })
    .then((booksObject) => {
      console.log("booksObject", booksObject);
      booksObject.forEach((element) => {
        let nuovaScheda = document.createElement("div");
        nuovaScheda.classList.add("col-12");
        nuovaScheda.classList.add("col-md-6");
        nuovaScheda.classList.add("col-lg-3");
        nuovaScheda.innerHTML = `
          <div class="card shadow bg-warning border border-warning-subtle rounded-4" style="width: 18rem">
            <img src="${element.img}" class="card-img-top" alt="Book" height="360" />
            <div class="card-body">
              <p class="card-title fs-3 fw-semibold lh-1">${element.title}</p>
              <p class="card-title fs-4 fw-semibold ">€${element.price}</p>
              <div class="d-flex">
              <p class="card-text fs-6 text fw-light mb-0 me-4 text-white">Categoria: "${element.category}"</p>
              <p class="card-text mt-0 fw-lighter text-white">Asin: ${element.asin}</p>
              </div>
              <div class="mt-3 d-flex justify-content-between">
                <button class="btn btn-danger btn-sm me-4 px-4 rounded-3 fs-5 deleteButton"><i class="bi bi-trash3"></i></button>
                <button class="btn btn-light btn-sm px-4 rounded-3 fs-5 cartButton"><i class="bi bi-bag-plus-fill"></i></button>
              </div>
            </div>
          </div>
        `;
        sezioneSchede.appendChild(nuovaScheda);
      });
    })
    .catch((err) => {
      console.log("errore!", err);
      // magari qua creeremmo un Alert di bootstrap...
      // - errori di connessione internet nostri
      // - siamo finiti qui dentro perchè abbiamo fatto un throw new Error()
    });
};
getBook();

const adCartFromMemory = function () {};
adCartFromMemory();
