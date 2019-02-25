class Book {
    constructor(id, title, author, format) {
        this.id = id,
            this.title = title;
        this.author = author;
        this.format = format;
    }
}

exports.getBook = function (id, title, author, format) {
    return new Book(id, title, author, format);
}

