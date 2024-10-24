function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function() {
        let bookInfo =  `${this.title} by ${this.author}, ${this.pages} pages, `;
        bookInfo += this.read ? "already read." : "not read yet";
        return bookInfo;
    };
}

