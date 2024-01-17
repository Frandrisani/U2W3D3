const sezioneSchede = document.getElementById("sezioneSchede"); //RICHIAMO ROW IN HTML ALLA QUALE VERRANO APPESE LE VARIE COLONNE CHE GENERIAMO DINAMICAMENTE

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
      booksObject.forEach((element, i) => {
        let nuovaScheda = document.createElement("div");
        nuovaScheda.classList.add("col-12");
        nuovaScheda.classList.add("col-md-6");
        nuovaScheda.classList.add("col-lg-3");
        nuovaScheda.classList.add(i);
        nuovaScheda.innerHTML = `
          <div class="card  shadow bg-warning border border-warning-subtle rounded-4" style="width: 18rem">
            <img src="${element.img}" class="card-img-top" alt="Book" height="360" />
            <div class="card-body">
              <p class="card-title fs-3 fw-semibold lh-1">${element.title}</p>
              <p class="card-title my-3 fs-4 fw-semibold text-end">€${element.price}</p>
              <div class="d-flex flex-column">
              <p class="card-text fs-6 text fw-light mb-0 me-4 text-white fw-bolder"><i class="bi bi-bookmark-fill"></i> ${element.category}</p>
              <p class="card-text mt-0 fw-lighter text-white fw-bolder"><i class="bi bi-hash"></i>${element.asin}</p>
              </div>
              <div class="mt-3 d-grid gap-2">
              <button class="btn btn-light btn-sm px-4 rounded-3 fs-5 cartButton"><i class="bi bi-bag-plus-fill"></i></button>
                <button class="btn btn-danger btn-sm  px-4 rounded-3 fs-5 deleteButton"><i class="bi bi-trash3"></i></button>
              </div>
            </div>
          </div>
        `;
        sezioneSchede.appendChild(nuovaScheda);
        // -- QUI AGGIUNGIAMO UN EVENTLISTENER PER IL DELETE DELLA CARD
        const deleteButton = nuovaScheda.querySelector(".deleteButton");
        deleteButton.addEventListener("click", function () {
          deleteCard(nuovaScheda);
        });
        const cartButton = nuovaScheda.querySelector(".cartButton");
        cartButton.addEventListener("click", cartCard);
      });
    })
    .catch((err) => {
      console.log("errore!", err);
      // magari qua creeremmo un Alert di bootstrap...
      // - errori di connessione internet nostri
      // - siamo finiti qui dentro perchè abbiamo fatto un throw new Error()
    });
};

const deleteCard = function (card) {
  card.remove();
};

const cartCard = function (event) {
  const newBookOnCart = document.getElementsByClassName("dropdown-menu")[0];
  const newLine = document.createElement("div");
  const cartButton = event.currentTarget;
  // Risali alla scheda genitore
  const card = cartButton.closest(".col-12");

  // Ottieni i dati specifici dalla scheda
  const element = {
    title: card.querySelector(".card-title").textContent,
    price: card.querySelector(".card-title.fs-4").textContent,
    // ... altri dati
  };

  newLine.innerHTML = `
  <div class="d-flex dropdown-item ">
  <div class="d-flex" >
      <p class="me-5">${element.title}</p>
      <p class="me-5">${element.price}</p>
  </div>
  <button class="btn btn-danger btn-sm  px-4 rounded-3 fs-5 deleteButtonCart"><i class="bi bi-trash3"></i></button>
</div>
<hr/>`;
  newBookOnCart.appendChild(newLine);
};

getBook();
