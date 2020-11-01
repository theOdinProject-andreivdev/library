function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.bkgColor = "hsl(" + Math.floor(Math.random() * 360) + ", 25%, 85%)";
}

Book.prototype.displayBook = function (id) {
  let bookCard = document.createElement("div");
  bookCard.classList.add("bookCard");

  bookCard.style.backgroundColor = this.bkgColor;

  let bookTitle = document.createElement("div");
  bookTitle.classList.add("bookTitle");
  bookTitle.textContent = this.title;

  let bookAuthor = document.createElement("div");
  bookAuthor.classList.add("bookAuthor");
  bookAuthor.textContent = this.author;

  let bookPages = document.createElement("div");
  bookPages.classList.add("bookPages");
  bookPages.textContent = "Pages: " + this.pages;

  let bookRead = document.createElement("div");
  bookRead.classList.add("bookRead");
  if (this.read == "true") bookRead.textContent = "Already read";
  else bookRead.textContent = "Not read yet";

  let toggleButton = document.createElement("button");
  toggleButton.classList.add("toggleButton");
  toggleButton.dataset.bookId = id;
  toggleButton.addEventListener("click", toggleAction);
  toggleButton.textContent = "Toggle read";

  let deteleButton = document.createElement("button");
  deteleButton.classList.add("deleteButton");
  deteleButton.dataset.bookId = id;
  deteleButton.addEventListener("click", deleteAction);
  deteleButton.textContent = "Delete";

  bookCard.appendChild(bookTitle);
  bookCard.appendChild(bookAuthor);
  bookCard.appendChild(bookPages);
  bookCard.appendChild(bookRead);
  bookCard.appendChild(toggleButton);
  bookCard.appendChild(deteleButton);

  container.appendChild(bookCard);
};

let container = document.querySelector(".container");
let library = [];

//if we have a library stored, used it, else, create some dummies

if (localStorage.hasOwnProperty("library")) {
  library = JSON.parse(localStorage.getItem("library"));

  //really weird bug, I think prototype is erased when loading from storage
  //so we do it again
  library.forEach((book) => {
    book.__proto__ = new Book();
  });
} else {
  myBook1 = new Book("Title1", "Author1", 1, "true");
  myBook2 = new Book("Title2", "Author2", 1, "false");
  myBook3 = new Book("Title3", "Author3", 1, "true");

  addBookToLibrary(myBook1);
  addBookToLibrary(myBook2);
  addBookToLibrary(myBook3);
}

display();

let addButton = document.querySelector(".addButton");
addButton.addEventListener("click", function () {
  let newBook;
  let newTitle = document.querySelector(".title").value;
  let newAuthor = document.querySelector(".author").value;
  let newPages = document.querySelector(".pages").value;
  let newRead = document.querySelector(".read").value;
  console.log(newRead);
  newBook = new Book(newTitle, newAuthor, newPages, newRead);

  addBookToLibrary(newBook);
  display();
});

function addBookToLibrary(book) {
  library.push(book);
}

function display() {
  resetDisplay();
  for (i = 0; i < library.length; i++) {
    library[i].displayBook(i);
  }
  localStorage.setItem("library", JSON.stringify(library));
  console.log(JSON.stringify(library));
}

function resetDisplay() {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

function toggleAction() {
  let bookId = this.dataset.bookId;
  if (library[bookId].read == "true") library[bookId].read = "false";
  else library[bookId].read = "true";
  display();
}

function deleteAction() {
  let bookId = this.dataset.bookId;
  library.splice(bookId, 1);
  display();
}

// storage lib
function storageAvailable(type) {
  var storage;
  try {
    storage = window[type];
    var x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}
