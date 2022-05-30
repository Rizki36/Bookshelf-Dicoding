const KEY_STORAGE = "books";

// ------ cache element selector ------
const $formAddBook = qs("#form-add-book");
const $inpJudul = $formAddBook.querySelector("#i-judul");
const $inpPenulis = $formAddBook.querySelector("#i-penulis");
const $inpTahun = $formAddBook.querySelector("#i-tahun");
const $inpCover = $formAddBook.querySelector("#i-cover");
const $inpStatus = $formAddBook.querySelector("#i-status");

const $containerRead = qs("#container-read-book");
const $containerUnRead = qs("#container-unread-book");

const $templateBook = qs("#book-template");

// --------------------------------------------------------

// ------ Storage Functions ------

/**
 * get all books
 * @return array
 */
function getBooks() {
    // get from localstorage
    return JSON.parse(localStorage.getItem(KEY_STORAGE)) || [];
}

/**
 * @param number id
 */
function deleteBook(id) {
    const books = getBooks();
    const filteredBooks = books.filter((book) => book.id !== id);
    setBooks(filteredBooks);
    renderBooks(filteredBooks);
}

/**
 * @param array books
 */
function setBooks(books = []) {
    localStorage.setItem(KEY_STORAGE, JSON.stringify(books));
}

// --------------------------------------------------------

// ----------- Utils -----------

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

    // render unread books
    unReadBooks.forEach((book) => {
        unReadBookHtml += bookToHtml(book);
    });
    $containerUnRead.innerHTML = unReadBookHtml;
}

function bookToHtml(book) {
    const html = $templateBook.cloneNode(true);

    qs(".book-item", html.content).setAttribute(
        "data-json",
        JSON.stringify(book)
    );

    qs(".book-title", html.content).textContent = book.judul;
    qs(".book-year", html.content).textContent = book.tahun;
    qs(".book-writer", html.content).textContent = book.penulis;
    qs(".book-img", html.content).src = book.cover;

    return html.innerHTML;
}

/** query selector */
function qs(selector, scope = document) {
    return scope.querySelector(selector);
}

function handleDelete($el) {
    const $bookItem = $el.closest(".book-item");
    const json = $bookItem.getAttribute("data-json");
    const book = JSON.parse(json);
    deleteBook(book.id);
}

// --------------------------------------------------------

window.onload = function () {
    const books = getBooks();
    renderBooks(books);
};
