const KEY_STORAGE = "books";

// ----------- cache element selector
const $formAddBook = qs("#form-add-book");
const $inpJudul = $formAddBook.querySelector("#i-judul");
const $inpPenulis = $formAddBook.querySelector("#i-penulis");
const $inpTahun = $formAddBook.querySelector("#i-tahun");
const $inpCover = $formAddBook.querySelector("#i-cover");
const $inpStatus = $formAddBook.querySelector("#i-status");

const $containerRead = qs("#container-read-book");

const $templateBook = qs("#book-template");

// --------------------------------------------------------

/** @return object { judul, penulis, tahun, cover, status } */
function getFormData() {
    // get form data
    const judul = $inpJudul.value;
    const penulis = $inpPenulis.value;
    const tahun = $inpTahun.value;
    const cover = $inpCover.value;
    const status = $inpStatus.checked;

    return {
        judul,
        penulis,
        tahun,
        cover,
        status,
    };
}

/**
 * render read and unread books
 * @param array books
 */
function renderBooks(books = []) {
    let readBookHtml = "";
    let unReadBookHtml = "";

    // get read and unread books
    const readBooks = books.filter((book) => book.status);
    const unReadBooks = books.filter((book) => !book.status);

    // render read books
    readBooks.forEach((book) => {
        readBookHtml += bookToHtml(book);
    });
    $containerRead.innerHTML = readBookHtml;
}

/**
 * get all books
 * @return array
 */
function getBooks() {
    // get from localstorage
    return JSON.parse(localStorage.getItem(KEY_STORAGE)) || [];
}

function deleteBook(id) {
    const books = getBooks();
    books.splice(id, 1);
    localStorage.setItem(KEY_STORAGE, JSON.stringify(books));
    renderBooks(books);
}

function bookToHtml(book) {
    const html = $templateBook.cloneNode(true);

    html.content.querySelector(".book-title").textContent = book.judul;
    html.content.querySelector(".book-year").textContent = book.tahun;
    html.content.querySelector(".book-writer").textContent = book.penulis;
    html.content.querySelector(".book-img").src = book.cover;

    return html.innerHTML;
}

/** query selector */
function qs(selector) {
    return document.querySelector(selector);
}

window.onload = function () {
    renderBooks([
        {
            judul: "Harry Potter",
            penulis: "J.K. Rowling",
            tahun: "2005",
            cover: "img/harry-potter.jpg",
            status: true,
        },
    ]);
};
