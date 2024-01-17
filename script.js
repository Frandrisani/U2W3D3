const sezioneSchede = document.getElementById("sezioneSchede");

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
        nuovaScheda.classList.add("col-3");
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
                <a href="#" class="btn btn-danger btn-sm me-4 px-4 rounded-3 fs-5"><i class="bi bi-trash3"></i></a>
                <a href="#" class="btn btn-light btn-sm px-4 rounded-3 fs-5"><i class="bi bi-bag-plus-fill"></i></a>
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
