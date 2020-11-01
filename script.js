let container = document.querySelector(".container");
let library = [];

function Book(index, title, author, pages, read) {
  this.index = index;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

myBook1 = new Book(0, "Title1", "Author1", 1, true);
myBook2 = new Book(1, "Title2", "Author2", 1, false);
myBook3 = new Book(2, "Title3", "Author3", 1, true);

addBookToLibrary(myBook1);
addBookToLibrary(myBook2);
addBookToLibrary(myBook3);

display();

function addBookToLibrary(book) {
  library.push(book);
}

function display() {
  library.forEach((book) => {
    let bookCard = document.createElement("div");
    bookCard.classList.add("bookCard");

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
    if (book.read) bookRead.textContent = "Already read";
    else bookRead.textContent = "Not read yet";
    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookAuthor);
    bookCard.appendChild(bookPages);
    bookCard.appendChild(bookRead);

    container.appendChild(bookCard);
  });
}
