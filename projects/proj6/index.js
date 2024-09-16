class Book {
    constructor(title, author, rating){
        this.title = title;
        this.author = author;
        this.rating = rating;
    }
}

class UI {
    static displayBooks(){
        const books = [];
        
        books.forEach((book) => UI.addBookToList(book));
    }
    
    static addBookToList(book) {
        const list = document.getElementById("book-list");
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.rating}</td>
        <td class="centered"><a href="#" class="delete">X</td>
        `;
        list.appendChild(row);
    }

    static showAlert(message, className) {
        const container = document.querySelector(".container");
        const div = document.createElement("div");
        const form = document.querySelector("#book-form")
        
        div.textContent = message;
        div.classList.add(className);

        container.insertBefore(div, form);

        setTimeout(() => document.querySelector(`.${className}`).remove(), 2000)
    }

    static deleteBook(deleteElement) {
        const row = document.querySelector(`.${deleteElement}`).parentElement.parentElement;
        row.remove();
    }

    static clearFields() {
        document.querySelector("#title").value = '';
        document.querySelector("#author").value = '';
        document.querySelector("#rating").value = '';
    }
}

document.addEventListener('DOMContentLoaded', UI.displayBooks);

document.querySelector("#book-form").addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const rating = document.querySelector("#rating").value;

    if (title === '' || author === '' || rating === '') {
        UI.showAlert("Fill in the fields please!", "fail");
        UI.clearFields();
    } else {
        const book = new Book(title, author, rating);
        UI.addBookToList(book);
        UI.showAlert("The book has been added!", "success");
        UI.clearFields();
    }
});

document.querySelector("table").addEventListener("click", (event) => {
    if (event.target.className === "delete") {
        UI.deleteBook(event.target.className);
        UI.showAlert("The book has been removed!", "success");
    }
})