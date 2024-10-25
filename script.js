const myLibrary = [];

let bookContainer = document.querySelector("#book-container");

let newBookButton = document.querySelector("#new-book-button");
let newBookClose = document.querySelector("#new-book-close");
let newBookModal = document.querySelector("#new-book-modal");
newBookButton.addEventListener("click", () => {
    newBookModal.classList.toggle("modal-hide");
});
newBookClose.addEventListener("click", () => {
    newBookModal.classList.toggle("modal-hide");
});

let submit = document.querySelector("#submit");
submit.addEventListener("click", (e) => {
    handleNewBookForm();
    e.preventDefault();
});

let creditsModalOpen = document.querySelector("#credits-open");
let creditsModalClose = document.querySelector("#credits-close");
let creditsModal = document.querySelector("#credits-container");
creditsModalOpen.addEventListener("click", () => {
    creditsModal.classList.toggle("modal-hide");
});

creditsModalClose.addEventListener("click", () => {
    creditsModal.classList.toggle("modal-hide");
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

function handleNewBookForm() {
    let titleInput = document.querySelector("#title");
    let authorInput = document.querySelector("#author");
    let pagesInput = document.querySelector("#pages");
    let readInput = document.querySelector("#read");

    if(!titleInput.checkValidity() || !authorInput.checkValidity() || !pagesInput.checkValidity()) {
        return;
    }

    let title = titleInput.value;
    titleInput.value = "";

    let author = authorInput.value;
    authorInput.value = "";

    let pages = pagesInput.value;
    pagesInput.value = "";

    let read = readInput.checked;
    readInput.checked = false;

    addBookToLibrary(title, author, pages, read);
    renderBooks();
    newBookModal.classList.toggle("modal-hide");
}

function createBookCardElement(book) {
    let bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.classList.add(book.read ? "read" : "not-read");

    let title = document.createElement("p");
    title.innerText = book.title;

    let author = document.createElement("p");
    author.innerText = book.author;

    let pages = document.createElement("p");
    pages.innerText = book.pages;

    let read = document.createElement("p");
    read.innerText = book.read ? "Read" : "Not read";

    let toggleReadButton = document.createElement("button");
    toggleReadButton.innerText = "Toggle";
    toggleReadButton.addEventListener("click", () => {
        toggleReadStatus(book.title);
    });

    let deleteBookButton = document.createElement("button");
    deleteBookButton.innerText = "Delete";
    deleteBookButton.addEventListener("click", () => {
        deleteBookFromTitle(book.title);
    });

    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages)
    bookCard.appendChild(read);
    bookCard.appendChild(toggleReadButton);
    bookCard.appendChild(deleteBookButton);

    return bookCard;
}

function toggleReadStatus(title) {
    let index = -1;

    for(let i = 0; i < myLibrary.length; i++) {
        if(myLibrary[i].title === title) {
            index = i;
            break;
        }
    }

    myLibrary[index].read = !myLibrary[index].read;
    renderBooks()
}

function deleteBookFromTitle(title) {
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
