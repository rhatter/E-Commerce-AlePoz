//Url di accesso ai prodotti
let urlProd = "https://striveschool-api.herokuapp.com/api/product/";

//Autorizzazione accesso DB
/*fetch("https://striveschool-api.herokuapp.com/api/product/", {
headers: {
"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGViMWUzZWY3MDlhMTAwMTQ3NjEzZjkiLCJpYXQiOjE2OTMxMzAzMDMsImV4cCI6MTY5NDMzOTkwM30.ZOOtnOIJsQ1q2K7ZnYg2L6t247wpJ5qkvqwgSemdVII"
}
})
*/

//Caricare i dati
/*
let carico = await fetch(url, {
method :"POST",
headers: {
"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGViMWUzZWY3MDlhMTAwMTQ3NjEzZjkiLCJpYXQiOjE2OTMxMzAzMDMsImV4cCI6MTY5NDMzOTkwM30.ZOOtnOIJsQ1q2K7ZnYg2L6t247wpJ5qkvqwgSemdVII",
"Content-Type":"application/json"
},
body: JSON.stringify(obj)
})
*/

//Modificare i dati
/*
let modifico = await fetch(url+id, {
method :"PUT",
headers: {
"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGViMWUzZWY3MDlhMTAwMTQ3NjEzZjkiLCJpYXQiOjE2OTMxMzAzMDMsImV4cCI6MTY5NDMzOTkwM30.ZOOtnOIJsQ1q2K7ZnYg2L6t247wpJ5qkvqwgSemdVII",
"Content-Type":"application/json"
},
body: JSON.stringify(obj)
})
*/

//Delete
/*
let cancello = await fetch(url+id, {
method :"DELETE",
headers: {
"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGViMWUzZWY3MDlhMTAwMTQ3NjEzZjkiLCJpYXQiOjE2OTMxMzAzMDMsImV4cCI6MTY5NDMzOTkwM30.ZOOtnOIJsQ1q2K7ZnYg2L6t247wpJ5qkvqwgSemdVII",
},
})
*/

//dati di pexels per la fetch
let auth = "e5qBXT986QSCczWU3eSdLdHRredenMoeZyBp3n8OFhtrIXSEXpMz4Xy7";
let url = "https://api.pexels.com/v1/search";
let photoNumber = 10;

function content(url, query, auth, orient, color, number, page) {
  //orient è l'orientamento dell'immagine
  let search = url;
  if (Boolean(query)) {
    search += "?query=" + query;
  }
  if (Boolean(orient)) {
    search += "&orientation=" + orient;
  }
  if (Boolean(color)) {
    search += "&color=" + color;
  }
  if (Boolean(page)) {
    search += "&page=" + page;
  }
  if (Boolean(number)) {
    search += "&per_page=" + number;
  }
  return fetch(search, {
    method: "GET",
    headers: new Headers({
      Authorization: auth,
    }),
  });
}

//do uno sfondo randomico alla navbar
function getRandomImage() {
  let dataBackground = ["playstation", "videogame"];
  let toSearch =
    dataBackground[Math.floor(Math.random() * dataBackground.length)];
  content(url, toSearch, auth, "landscape", "blue")
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      assignBack(data);
    });
}
function assignBack(a) {
  let obj = a;
  let index = Math.floor(Math.random() * obj.photos.length);
  let img = obj.photos[index].src.landscape;
  let dest = document.getElementById("navBar");
  dest.style.backgroundImage = `url("${img}")`;
  let back = document.getElementsByClassName("navBackground")[0];
  back.style.opacity = "50%";
  back.style.backgroundColor = obj.photos[index].avg_color;
  let option = document.querySelectorAll(".nav-item.dropdown > .dropdown-menu");
  option.forEach(
    (e) => (e.style.backgroundColor = obj.photos[index].avg_color)
  );
  let avgBack =
    option[0].style.backgroundColor
      .replace("rgb(", "")
      .replace(")", "")
      .replace(/\s/g, "")
      .split(",")
      .reduce(
        (accumulator, currentValue) =>
          parseInt(accumulator) + parseInt(currentValue)
      ) /
      3 <
    200;
  if (avgBack) {
    document
      .querySelectorAll(".nav-item.dropdown > .dropdown-menu a")
      .forEach((e) => (e.style.color = "white"));
  }
}
getRandomImage();

function elabColor(color) {
  let rgb = color.replace("rgb(", "").replace(")", "").replace(" ", "");
  return `rgba(${rgb}, 0.8)`;
}

let descriptions = document.querySelectorAll(".cardBottomArea > :nth-child(2)");
for (d of descriptions) {
  d.style.display = "-webkit-box";
  d.addEventListener("click", (e) => {
    if (e.target.style.display === "-webkit-box") {
      e.target.style.display = "block";
    } else {
      e.target.style.display = "-webkit-box";
    }
  });
}

function toModifyPage() {
  window.open("./modify.html", "_top");
}

let modifyButton = document.querySelectorAll(".modifyArea");
for (button of modifyButton) {
  button.addEventListener("click", (e) => {
    modify(e);
  });
}
function modify(e) {
  console.log(e);
  let cartaDest =
    e.target.parentElement.parentElement.parentElement.parentElement;
  let imgDir =
    e.target.parentElement.parentElement.parentElement.childNodes[3]
      .childNodes[1].src;
  let imgBack = imgDir;

  if (imgDir.substring(imgDir.length - 15) === "placeholder.jpg") {
    imgDir = "";
    imgBack = "./img/placeholder.jpg";
  }
  let importo =
    e.target.parentElement.parentElement.childNodes[1].dataset.importo;
  let descrizione =
    e.target.parentElement.parentElement.childNodes[3].innerText;
  let dataCons =
    e.target.parentElement.parentElement.childNodes[5].dataset.daydelay;
  let idProd =
    e.target.parentElement.parentElement.parentElement.dataset.idprodotto;
  let descrizioneBreve =
    e.target.parentElement.parentElement.parentElement.childNodes[1]
      .childNodes[3].innerText;
  if (descrizioneBreve === "" || descrizioneBreve === undefined) {
    descrizioneBreve === "";
  }
  let node = document.createElement("div");
  let classi =
    "cardmargin col-md-6 col-xl-4 d-flex justify-content-center align-items-start";
  for (c of classi.split(" ")) {
    node.classList.add(c);
  }
  console.log(node);
  let htmlModified = `
          <div
            data-idprodotto="${idProd}"
            class="card col-11 d-flex flex-column"
          >
            <div class="cardHeadArea my-1">
              <p class="idProdTx">Id prodotto: <strong>${idProd}</strong></p>
              <label>Descrizione breve</label>
              <input
                type="text"
                placeholder="Dai un nome al tuo prodotto"
                value="${descrizioneBreve}"
              />
            </div>
            <div class="cardImageArea">
              <label>URL immagine</label>
              <input
                type="text"
                placeholder="URL immagine"
                value="${imgDir}"
              />
              <img src="${imgBack}" alt="" />
            </div>
            <div class="cardBottomArea">
              <label>Price</label>
              <input type="number" min="1" step="0.01" value="${importo}" />
              <label>Descrizione dettagliata</label>
              <textarea
                class="descrDett"
                type="text"
                placeholder="Scendi nei dettagli, racconta cosa rende questo prodotto speciale"
                
                cols="40"
                rows="5"
              >${descrizione}</textarea>

              <label>Giorni per la consegna</label>
              <input type="number" min="1" step="1" value="${dataCons}" />
              <div
                class="modifica d-flex justify-content-between align-items-center"
              >
                <div class="saveArea">
                  <span>SALVA</span>
                  <i class="fa-regular fa-floppy-disk"></i>
                </div>
                <i class="fa-solid fa-trash"></i>
              </div>
              <div class="messageArea" style="display: none">
                <span>Messaggio</span>
              </div>
            </div>
          </div>`;
  node.innerHTML = htmlModified;
  node.lastChild.childNodes[5].childNodes[13].lastElementChild.addEventListener(
    "click",
    (e) => {
      delCard(e);
    }
  );
  cartaDest.parentElement.replaceChild(node, cartaDest);
  let saveButtons = document.querySelectorAll(".saveArea");
  for (button of saveButtons) {
    button.addEventListener("click", (e) => {
      save(e);
    });
    let imgDirField = node.childNodes[1].childNodes[3].childNodes[3];
    imgDirField.addEventListener("focusout", function (e) {
      console.log(e.target.parentElement.parentElement.childNodes[15]);
      testImage(e.target.value);
      setTimeout(() => {
        if (imageCheck === 1) {
          e.target.nextElementSibling.src = e.target.value;
          e.target.parentElement.parentElement.childNodes[5].childNodes[15].style.display =
            "none";
        } else {
          //se immagine sbagliata dai il messaggio di errore
          e.target.parentElement.parentElement.childNodes[5].childNodes[15].childNodes[1].innerText =
            "Immagine del prodotto errata, inserisci un'immagine valida";
          e.target.parentElement.parentElement.childNodes[5].childNodes[15].style.display =
            "block";
        }
      }, 100);
    });
  }
}

function save(e, d) {
  let cartaDest =
    e.target.parentElement.parentElement.parentElement.parentElement;
  let imgDir =
    e.target.parentElement.parentElement.parentElement.childNodes[3]
      .childNodes[3].value;
  if (imgDir === "") {
    imgDir = "./img/placeholder.jpg";
  }
  let importo = e.target.parentElement.parentElement.childNodes[3].value;
  let descrizione = e.target.parentElement.parentElement.childNodes[7].value;
  let dataCons = e.target.parentElement.parentElement.childNodes[11].value;
  let idProd =
    e.target.parentElement.parentElement.parentElement.dataset.idprodotto;
  let descrizioneBreve;
  if (d === true) {
    descrizioneBreve =
      e.target.parentElement.parentElement.parentElement.childNodes[1]
        .childNodes[3].value;
  } else {
    descrizioneBreve =
      e.target.parentElement.parentElement.parentElement.childNodes[1]
        .childNodes[5].value;
  }
  if (descrizioneBreve === "" || descrizioneBreve === undefined) {
    descrizioneBreve = "";
  }
  let node = document.createElement("div");
  let classi =
    "cardmargin col-md-6 col-xl-4 d-flex justify-content-center align-items-start";
  for (c of classi.split(" ")) {
    node.classList.add(c);
  }
  let event = new Date();
  event.setDate(event.getDate() + parseInt(dataCons));
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  let dataTx = event.toLocaleDateString("it-IT", options);
  let htmlModified = `
          <div
            data-idProdotto="${idProd}"
            class="card col-11 d-flex flex-column"
          >
            <div class="cardHeadArea">
              <p class="idProdTx">Id prodotto: <strong>${idProd}</strong></p>
              <span>${descrizioneBreve}</span>
            </div>
            <div class="cardImageArea">
              <img
                src="${imgDir}"
                alt=""
              />
            </div>
            <div class="cardBottomArea">
              <p data-importo="${importo}">${importo
    .toString()
    .replace(".", ",")}€</p>
              <p data-isparag="true">
${descrizione}
              </p>
              <p data-dayDelay="${dataCons}">Ricevilo entro <b>${dataTx}</b></p>
              <div
                class="modifica d-flex justify-content-between align-items-center"
              >
                <div class="modifyArea">
                  <span>MODIFICA</span><i class="fa fa-pen-to-square mx-1"></i>
                </div>

                <i class="fa-solid fa-trash"></i>
              </div>
            </div>
          </div>`;
  node.innerHTML = htmlModified;
  node.lastChild.childNodes[5].lastElementChild.firstElementChild.addEventListener(
    "click",
    (e) => {
      modify(e);
    }
  );
  node.lastChild.childNodes[5].lastElementChild.lastElementChild.addEventListener(
    "click",
    (e) => {
      delCard(e);
    }
  );
  let textButt = node.lastChild.childNodes[5].childNodes[3];
  textButt.style.display = "-webkit-box";
  textButt.addEventListener("click", (e) => {
    if (e.target.style.display === "-webkit-box") {
      e.target.style.display = "block";
    } else {
      e.target.style.display = "-webkit-box";
    }
  });

  //recupero i dati per il post

  let objToPost;
  if (d !== true) {
    objToPost = {
      descBreve:
        e.target.parentElement.parentElement.parentElement.childNodes[1]
          .childNodes[5].value,
      imgDir:
        e.target.parentElement.parentElement.parentElement.childNodes[3]
          .childNodes[3].value,
      price: e.target.parentElement.parentElement.childNodes[3].value,
      descrizione: e.target.parentElement.parentElement.childNodes[7].value,
      consegna: e.target.parentElement.parentElement.childNodes[11].value,
    };
  } else {
    objToPost = {
      descBreve:
        e.target.parentElement.parentElement.parentElement.childNodes[1]
          .childNodes[3].value,
      imgDir:
        e.target.parentElement.parentElement.parentElement.childNodes[3]
          .childNodes[3].value,
      price: e.target.parentElement.parentElement.childNodes[3].value,
      descrizione: e.target.parentElement.parentElement.childNodes[7].value,
      consegna: e.target.parentElement.parentElement.childNodes[11].value,
    };
  }

  testImage(objToPost.imgDir);
  setTimeout(() => {
    if (objToPost.descBreve === "") {
      e.target.parentElement.parentElement.childNodes[15].childNodes[1].innerText =
        "Nome del prodotto mancante, inserisci il nome del prodotto";
      e.target.parentElement.parentElement.childNodes[15].style.display =
        "block";
    } else if (objToPost.imgDir === "") {
      e.target.parentElement.parentElement.childNodes[15].childNodes[1].innerText =
        "Immagine del prodotto mancante, inserisci l'immagine del prodotto";
      e.target.parentElement.parentElement.childNodes[15].style.display =
        "block";
    } else if (imageCheck === 0) {
      e.target.parentElement.parentElement.childNodes[15].childNodes[1].innerText =
        "Immagine del prodotto errata, inserisci un'immagine valida";
      e.target.parentElement.parentElement.childNodes[15].style.display =
        "block";
    } else if (objToPost.descrizione === "") {
      e.target.parentElement.parentElement.childNodes[15].childNodes[1].innerText =
        "Descrizione del prodotto necessaria, inserisci una descrizione valida";
      e.target.parentElement.parentElement.childNodes[15].style.display =
        "block";
    } else if (objToPost.price === "0" || objToPost.price === "") {
      e.target.parentElement.parentElement.childNodes[15].childNodes[1].innerText =
        "Prezzo del prodotto mancante, inserisci prezzo del prodotto";
      e.target.parentElement.parentElement.childNodes[15].style.display =
        "block";
    } else {
      let buttonAdd = document.createElement("div");
      buttonAdd.classList.add("addButton");
      let icoPlus = document.createElement("i");
      icoPlus.classList.add("fa-solid");
      icoPlus.classList.add("fa-plus");
      buttonAdd.appendChild(icoPlus);
      buttonAdd.addEventListener("click", (e) => {
        createNew(e);
      });
      if (d === true) {
        //lancia la fetch di post

        postData(
          createObj(
            objToPost.descBreve,
            objToPost.imgDir,
            objToPost.price,
            objToPost.descrizione,
            objToPost.consegna
          )
        )
          .then((resp) => {
            let risposta = resp.json();
            return risposta;
          })
          .then((resp) => {
            console.log(resp);
            cartaDest.parentElement.replaceChild(buttonAdd, cartaDest);
            node.firstElementChild.dataset.idProdotto = resp._id;
            console.log(node.firstElementChild.dataset.idProdotto);
            node.firstElementChild.firstElementChild.firstElementChild.firstElementChild.innerText =
              resp._id;
            document.getElementsByClassName("cardArea ")[0].appendChild(node);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        //lancia la fetch per modificare
        putdata(
          createObj(
            objToPost.descBreve,
            objToPost.imgDir,
            objToPost.price,
            objToPost.descrizione,
            objToPost.consegna
          ),
          idProd
        )
          .then((resp) => {
            let risposta = resp.json();
            console.log(risposta);
            return risposta;
          })
          .then((resp) => {
            console.log(resp);
            cartaDest.parentElement.replaceChild(node, cartaDest);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }, 100);
}

document
  .getElementsByTagName("body")[0]
  .addEventListener("click", function (e) {
    let descriptions = document.querySelectorAll(
      ".cardBottomArea > :nth-child(2)"
    );
    if (e.target.dataset.isparag !== "true") {
      for (d of descriptions) {
        if (d.style.display === "block") {
          d.style.display = "-webkit-box";
        }
      }
    }
  });

function createNew(e) {
  let node = document.createElement("div");
  let classi =
    "cardmargin col-md-6 col-xl-4 d-flex justify-content-center align-items-start";
  for (c of classi.split(" ")) {
    node.classList.add(c);
  }
  let htmlModified = `
          <div
            data-idProdotto=""
            class="card col-11 d-flex flex-column"
          >
            <div class="cardHeadArea my-1">
              <label>Descrizione breve</label>
              <input
                type="text"
                placeholder="Dai un nome al tuo prodotto"
                value=""
              />
            </div>
            <div class="cardImageArea">
              <label>URL immagine</label>
              <input
                type="text"
                placeholder="URL immagine"
                value=""
              />
              <img src="./img/placeholder.jpg" alt="placeholder" />
            </div>
            <div class="cardBottomArea">
              <label>Price</label>
              <input type="number" min="1" step="0.01" value="0" />
              <label>Descrizione dettagliata</label>
              <textarea
                class="descrDett"
                type="text"
                placeholder="Scendi nei dettagli, racconta cosa rende questo prodotto speciale"
                
                cols="40"
                rows="5"
              ></textarea>

              <label>Giorni per la consegna</label>
              <input type="number" min="1" step="1" value="0" />
              <div
                class="modifica d-flex justify-content-between align-items-center"
              >
                <div class="saveArea">
                  <span>SALVA</span>
                  <i class="fa-regular fa-floppy-disk"></i>
                </div>
                <i class="fa-solid fa-trash"></i>
              </div>
    <div class="messageArea" style="display: none">
      <span>Messaggio</span>
    </div>
            </div>
          </div>`;

  node.innerHTML = htmlModified;
  node.lastChild.childNodes[5].childNodes[13].firstElementChild.addEventListener(
    "click",
    (e) => {
      save(e, true);
    }
  );
  node.lastChild.childNodes[5].childNodes[13].lastElementChild.addEventListener(
    "click",
    (e) => {
      //da inserire codice per togliere il più
    }
  );
  let imgDirField = node.childNodes[1].childNodes[3].childNodes[3];
  imgDirField.addEventListener("focusout", function (e) {
    testImage(e.target.value);
    setTimeout(() => {
      if (imageCheck === 1) {
        e.target.nextElementSibling.src = e.target.value;
        e.target.parentElement.parentElement.childNodes[5].childNodes[15].style.display =
          "none";
      } else {
        //se immagine sbagliata dai il messaggio di errore
        e.target.parentElement.parentElement.childNodes[5].childNodes[15].childNodes[1].innerText =
          "Immagine del prodotto errata, inserisci un'immagine valida";
        e.target.parentElement.parentElement.childNodes[5].childNodes[15].style.display =
          "block";
      }
    }, 100);
  });
  e.target.parentElement.replaceChild(node, e.target);
}
let addbutthome = document.querySelector(".addButton");
if (addbutthome !== null) {
  addbutthome.addEventListener("click", (e) => {
    createNew(e);
  });
}

function testImage(URL) {
  var tester = new Image();
  tester.onload = imageFound;
  tester.onerror = imageNotFound;
  tester.src = URL;
}
function imageFound() {
  imageCheck = 1;
}
function imageNotFound() {
  imageCheck = 0;
}

let imageCheck = 0;

let dbTemporaneo = [
  {
    descBreve: "",
    imgDir: "",
    price: 0,
    descrizione: "",
    consegna: "",
  },
];

function createObj(descBreve, imgDir, price, descrizione, consegna) {
  let o = new Object();
  o.name = descBreve;
  o.imageUrl = imgDir;
  o.price = price;
  o.description = descrizione;
  o.delivery = consegna;
  o.brand = consegna;
  return o;
}

function getdata() {
  return fetch(urlProd, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGViMWUzZWY3MDlhMTAwMTQ3NjEzZjkiLCJpYXQiOjE2OTMzMTMyODcsImV4cCI6MTY5NDUyMjg4N30.bOhysXfseCg563AA8dgZnC3CaT4vYN2B8bNOyI2Fs3c",
    },
  });
}

function launchgetdata() {
  getdata()
    .then((resp) => {
      console.log(resp);
      return resp.json();
    })
    .then((data) => {
      console.log(data);
      if (document.querySelector("body").dataset.page === "Home") {
        createCardsHome(data);
      } else if (document.querySelector("body").dataset.page === "mod") {
        createCardsMod(data);
      } else if (document.querySelector("body").dataset.page === "Details") {
        createDetailsCard(data);
      }
    })

    .catch((error) => {
      console.log(error);
    });
}
window.addEventListener("load", (event) => {
  launchgetdata();
});

//inizio creazione cards
function createCardsMod(data) {
  for (card of data) {
    let node = document.createElement("div");
    let classi =
      "cardmargin col-md-6 col-xl-4 d-flex justify-content-center align-items-start";
    for (c of classi.split(" ")) {
      node.classList.add(c);
    }
    let event = new Date();
    event.setDate(event.getDate() + parseInt(card.brand));
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    let dataTx = event.toLocaleDateString("it-IT", options);
    let htmlModified = `
          <div
            data-idProdotto="${card._id}"
            class="card col-11 d-flex flex-column"
          >
            <div class="cardHeadArea">
              <p class="idProdTx">Id prodotto: <strong>${card._id}</strong></p>
              <span>${card.name}</span>
            </div>
            <div class="cardImageArea">
              <img
                src="${card.imageUrl}"
                alt=""
              />
            </div>
            <div class="cardBottomArea">
              <p data-importo="${card.price}">${card.price
      .toString()
      .replace(".", ",")}€</p>
              <p data-isparag="true">
${card.description}
              </p>
              <p data-dayDelay="${
                card.brand
              }">Ricevilo entro <b>${dataTx}</b></p>
              <div
                class="modifica d-flex justify-content-between align-items-center"
              >
                <div class="modifyArea">
                  <span>MODIFICA</span><i class="fa fa-pen-to-square mx-1"></i>
                </div>

                <i class="fa-solid fa-trash"></i>
              </div>
            </div>
          </div>`;
    node.innerHTML = htmlModified;
    node.lastChild.childNodes[5].lastElementChild.firstElementChild.addEventListener(
      "click",
      (e) => {
        modify(e);
      }
    );
    node.lastChild.childNodes[5].lastElementChild.lastElementChild.addEventListener(
      "click",
      (e) => {
        delCard(e);
      }
    );
    let textButt = node.lastChild.childNodes[5].childNodes[3];
    textButt.style.display = "-webkit-box";
    textButt.addEventListener("click", (e) => {
      if (e.target.style.display === "-webkit-box") {
        e.target.style.display = "block";
      } else {
        e.target.style.display = "-webkit-box";
      }
    });
    document.querySelector(".cardArea ").appendChild(node);
  }
}
//fine creazione feed cards

function postData(obj) {
  return fetch(urlProd, {
    method: "POST",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGViMWUzZWY3MDlhMTAwMTQ3NjEzZjkiLCJpYXQiOjE2OTMzMTMyODcsImV4cCI6MTY5NDUyMjg4N30.bOhysXfseCg563AA8dgZnC3CaT4vYN2B8bNOyI2Fs3c",
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(obj),
  });
}

function putdata(obj, id) {
  return fetch(urlProd + id, {
    method: "PUT",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGViMWUzZWY3MDlhMTAwMTQ3NjEzZjkiLCJpYXQiOjE2OTMxMzAzMDMsImV4cCI6MTY5NDMzOTkwM30.ZOOtnOIJsQ1q2K7ZnYg2L6t247wpJ5qkvqwgSemdVII",
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(obj),
  });
}

function deldata(id) {
  return fetch(urlProd + id, {
    method: "DELETE",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGViMWUzZWY3MDlhMTAwMTQ3NjEzZjkiLCJpYXQiOjE2OTMxMzAzMDMsImV4cCI6MTY5NDMzOTkwM30.ZOOtnOIJsQ1q2K7ZnYg2L6t247wpJ5qkvqwgSemdVII",
    },
  });
}

function delCard(e) {
  let id =
    e.target.parentElement.parentElement.parentElement.dataset.idprodotto;

  deldata(id)
    .then((resp) => {
      console.log(resp);
      return resp.json();
    })
    .then((data) => {
      console.log(data);
      e.target.parentElement.parentElement.parentElement.parentElement.remove();
    });
}

let delButts = document.querySelectorAll(".fa-trash");
console.log(delButts);
for (b of delButts) {
  b.addEventListener("click", (e) => {
    delCard(e);
  });
}

function createCardsHome(data) {
  for (card of data) {
    let node = document.createElement("div");
    let classi =
      "cardmargin col-md-6 col-xl-4 d-flex justify-content-center align-items-start";
    for (c of classi.split(" ")) {
      node.classList.add(c);
    }
    let event = new Date();
    event.setDate(event.getDate() + parseInt(card.brand));
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    let dataTx = event.toLocaleDateString("it-IT", options);
    let htmlModified = `
            <div data-id="${card._id}" class="card col-11 d-flex flex-column">
              <div class="cardHeadArea">
                <span>${card.name}</span>
              </div>
              <div class="cardImageArea">
                <img src="${card.imageUrl}" alt="" />
              </div>
              <div class="cardBottomArea">
                <p>${card.price}€</p>
                <p>
${card.description}
                </p>
                <p>data di consegna entro ${dataTx}</p>
                <div class="scopri d-flex justify-content-end my-1">
                  <a href="./details.html?id=${card._id}">
                    <span>scopri di più</span>
                  </a>
                </div>
              </div>
            </div>
          `;
    node.innerHTML = htmlModified;
    document.querySelector(".cardArea ").appendChild(node);
  }
}

function createDetailsCard(data) {
  const queryStr = new URLSearchParams(window.location.search);
  const productId = queryStr.get("id");
  for (card of data) {
    if (productId === card._id) {
      let node = document.createElement("div");
      let classi =
        "cardmargin col-md-11 col-md-8 col-xl-6 d-flex justify-content-center align-items-start";
      for (c of classi.split(" ")) {
        node.classList.add(c);
      }
      let event = new Date();
      event.setDate(event.getDate() + parseInt(card.brand));
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      let dataTx = event.toLocaleDateString("it-IT", options);
      let htmlModified = `
            <div data-id="${card._id}" class="card col-11 d-flex flex-column">
              <div class="cardHeadArea d-flex justify-content-center">
                <span>${card.name}</span>
              </div>
              <div class="cardImageArea">
                <img src="${card.imageUrl}" alt="" />
              </div>
              <div class="cardBottomArea">
                <p>${card.price}€</p>
                <p>
${card.description}
                </p>
                <p>data di consegna entro <strong>${dataTx}</strong></p>

              </div>
            </div>
          `;
      node.innerHTML = htmlModified;
      document.querySelector(".cardArea ").appendChild(node);
    }
  }
}

//code url
//?id=64e5247cdffb8b0014413dd9
//  const queryStr = new URLSearchParams(window.location.search);
//  const productId = queryStr.get("id");
