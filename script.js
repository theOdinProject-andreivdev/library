let container = document.querySelector(".container");
let library = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.bkgColor = "hsl(" + Math.floor(Math.random() * 360) + ", 25%, 85%)";
}

myBook1 = new Book("Title1", "Author1", 1, "true");
myBook2 = new Book("Title2", "Author2", 1, "false");
myBook3 = new Book("Title3", "Author3", 1, "true");

addBookToLibrary(myBook1);
addBookToLibrary(myBook2);
addBookToLibrary(myBook3);

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
  resetDisplay();
  display();
});

function addBookToLibrary(book) {
  library.push(book);
}

function displayBook(book, id) {
  let bookCard = document.createElement("div");
  bookCard.classList.add("bookCard");

  bookCard.style.backgroundColor = book.bkgColor;

  let bookTitle = document.createElement("div");
  bookTitle.classList.add("bookTitle");
  bookTitle.textContent = book.title;

  let bookAuthor = document.createElement("div");
  bookAuthor.classList.add("bookAuthor");
  bookAuthor.textContent = book.author;

  let bookPages = document.createElement("div");
  bookPages.classList.add("bookPages");
  bookPages.textContent = "Pages: " + book.pages;

  let bookRead = document.createElement("div");
  bookRead.classList.add("bookRead");
  if (book.read == "true") bookRead.textContent = "Already read";
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
}

function display() {
  for (i = 0; i < library.length; i++) {
    displayBook(library[i], i);
  }
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
  resetDisplay();
  display();
}

function deleteAction() {
  let bookId = this.dataset.bookId;
  library.splice(bookId, 1);
  resetDisplay();
  display();
}
