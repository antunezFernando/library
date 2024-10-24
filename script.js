const myLibrary = [];

let bookContainer = document.querySelector("#book-container");

let newBookButton = document.querySelector("#new-book-button");
newBookButton.addEventListener("click", () => {
    addBookToLibrary("Hi", "hello", 200, false);
    renderBooks();
});

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function() {
        let bookInfo =  `${this.title} by ${this.author}, ${this.pages} pages, `;
        bookInfo += this.read ? "already read." : "not read yet.";
        return bookInfo;
    };
}

function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

function createInitialBooks() {
    for(let i = 0; i < 6; i++) {
        myLibrary.push(new Book(`Book ${i+1}`, `Author ${i+1}`, 256, false));
    }
}

function createBookCardElement(book) {
    let bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    let title = document.createElement("p");
    title.innerText = book.title;

    let author = document.createElement("p");
    author.innerText = book.author;

    let deleteBookButton = document.createElement("button");
    deleteBookButton.innerHTML = "Delete";
    deleteBookButton.addEventListener("click", () => {
        deleteBookEvent(book.title);
    });

    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(deleteBookButton);

    return bookCard;
}

function deleteBookEvent(title) {
    let index = -1;
    for(let i = 0; i < myLibrary.length; i++) {
        if(myLibrary[i].title === title) {
            index = i;
            break;
        }
    }

    myLibrary.splice(index, 1);
    renderBooks()
}

function renderBooks() {
    bookContainer.innerHTML = "";
    for(let book of myLibrary) {
        bookContainer.appendChild(createBookCardElement(book));
    }
}

createInitialBooks();
renderBooks();
