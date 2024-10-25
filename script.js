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

function Book(title, author, pages, read, coverLink) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.coverLink = coverLink;
}

function addBookToLibrary(title, author, pages, read, coverLink) {
    let book = new Book(title, author, pages, read, coverLink);
    myLibrary.push(book);
}



function handleNewBookForm() {
    let titleInput = document.querySelector("#title");
    let authorInput = document.querySelector("#author");
    let pagesInput = document.querySelector("#pages");
    let readInput = document.querySelector("#read");
    let coverInput = document.querySelector("#cover");

    if (!titleInput.checkValidity() || !authorInput.checkValidity() || !pagesInput.checkValidity()) {
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

    let coverLink = coverInput.value != "" ? coverInput.value : "";
    coverInput.value = "";

    addBookToLibrary(title, author, pages, read, coverLink);
    renderBooks();
    newBookModal.classList.toggle("modal-hide");
}

function createBookCardElement(book) {
    let bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.classList.add(book.read ? "read" : "not-read");

    bookCard.style.backgroundImage = `url('${book.coverLink}')`;

    let title = document.createElement("p");
    title.classList.add("book-card-item");
    title.innerText = `Title: ${book.title}`;

    let author = document.createElement("p");
    author.classList.add("book-card-item");
    author.innerText = `Author: ${book.author}`;

    let pages = document.createElement("p");
    pages.classList.add("book-card-item");
    pages.innerText = `N° of pages: ${book.pages}`;

    let read = document.createElement("p");
    read.classList.add("book-card-item");
    read.innerText = book.read ? "Read status: Read" : "Read Status: Not read";

    let toggleReadButton = document.createElement("div");
    toggleReadButton.classList.add("book-card-item");
    toggleReadButton.classList.add("toggle-button");
    toggleReadButton.innerText = "Change read status";
    toggleReadButton.addEventListener("click", () => {
        toggleReadStatus(book.title);
    });

    let deleteBookButton = document.createElement("img");
    deleteBookButton.src = "./images/trash.png";
    deleteBookButton.classList.add("delete-button")
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

    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].title === title) {
            index = i;
            break;
        }
    }

    myLibrary[index].read = !myLibrary[index].read;
    renderBooks();
}

function deleteBookFromTitle(title) {
    let index = -1;

    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].title === title) {
            index = i;
            break;
        }
    }

    myLibrary.splice(index, 1);
    renderBooks()
}

function createInitialBooks() {
    myLibrary.push(new Book("The Hobbit", "J.R.R. Tolkien", 312, false, "https://m.media-amazon.com/images/I/71V2v2GtAtL._AC_UF1000,1000_QL80_.jpg"));
    myLibrary.push(new Book("1984", "George Orwell", 328, true, "https://images.cdn1.buscalibre.com/fit-in/360x360/b0/39/b039af065268818b7bd3b0e016f8db65.jpg"));
    myLibrary.push(new Book("Brave New World", "Aldous Huxley", 288, true, "https://images.cdn2.buscalibre.com/fit-in/520x520/39/b9/655e3488405a63dde352f847757d07f3.jpg"));
    myLibrary.push(new Book("Crime & Punishment", "Fyodor Dostoevsky", 624, false, "https://miro.medium.com/v2/resize:fit:397/1*_oGNO3yGQpp4_n6-Fjx-Gg@2x.jpeg"));
    myLibrary.push(new Book("Steel Ball Run: Volume 1", "Hirohiko Araki", 181, true, "https://upload.wikimedia.org/wikipedia/en/8/87/Steel_Ball_Run_1.jpg"));
    myLibrary.push(new Book("The Strange Case Of Dr. Jekyll and Mr.Hyde", "Robert Louis Stevenson", 138, false, "https://m.media-amazon.com/images/I/616qN8q2pPL._AC_UF1000,1000_QL80_.jpg"));
}

function renderBooks() {
    bookContainer.innerHTML = "";
    for (let book of myLibrary) {
        bookContainer.appendChild(createBookCardElement(book));
    }
}

createInitialBooks();
renderBooks();
