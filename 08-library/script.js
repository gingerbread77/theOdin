const myLibrary = loadLibrary(); 

class Book {
  constructor(id, title, author, pages, isRead, coverImg) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.coverImg = coverImg;
  }
}

// load library
function loadLibrary() {
  const storedBooks = localStorage.getItem("myLibrary");
  return storedBooks ? JSON.parse(storedBooks) : [];
}

// save books in localstorage
function saveLibrary() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

// fetch book cover image
async function fetchBookCover(title) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${title}&key=AIzaSyA3P4Ho-O0VqoyRCrRD9vOp8H7twGwj_tc`
    );
    const data = await response.json();
    return data.items[0]?.volumeInfo?.imageLinks?.thumbnail || "";
  } catch (error) {
    console.error("Error fetching cover:", error);
    return "";
  }
}

// create book element
function createBookElement(book) {
  const bookElement = document.createElement("div");
  bookElement.className = "book-item";
  bookElement.dataset.id = book.id;

  if (book.coverImg) {
    bookElement.style.backgroundImage = `url(${book.coverImg})`;
  }

  const controlsContainer = document.createElement("div");
  controlsContainer.className = "controls";

  // create buttons
  const viewBtn = document.createElement("button");
  viewBtn.className = "viewBtn";
  viewBtn.textContent = "View";

  const readBtn = document.createElement("button");
  readBtn.className = "readBtn";
  updateReadBtn(readBtn, book.isRead);
  readBtn.addEventListener("click", () => toggleReadStatus(book.id));

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "deleteBtn";
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => removeBook(book.id));

  controlsContainer.append(viewBtn, readBtn, deleteBtn);
  bookElement.appendChild(controlsContainer);
  return bookElement;
}

// render the book shelf
function displayBookShelf() {
  const bookShelf = document.querySelector(".book-shelf");
  bookShelf.innerHTML = ""; 

  myLibrary.forEach(book => {
    const bookElement = createBookElement(book);
    bookShelf.appendChild(bookElement);
  });
}

// add books to library
async function addBookToLibrary(title, author, pages, isRead) {
  const id = Date.now(); 
  const coverImg = await fetchBookCover(title);
  const book = new Book(id, title, author, pages, isRead, coverImg);

  myLibrary.push(book);
// update local storage
  saveLibrary(); 
  document.querySelector(".book-shelf").appendChild(createBookElement(book));
}

// delete books by id
function removeBook(id) {
  const index = myLibrary.findIndex(book => book.id === id);
  if (index !== -1) {
    myLibrary.splice(index, 1);
    saveLibrary();
  }

  const bookElement = document.querySelector(`.book-item[data-id='${id}']`);
  if (bookElement) {
    bookElement.remove();
  }
}

// update read status
function toggleReadStatus(id) {
  const book = myLibrary.find(book => book.id === id);
  if (book) {
    book.isRead = !book.isRead;
    saveLibrary();

    const bookElement = document.querySelector(`.book-item[data-id='${id}']`);
    if (bookElement) {
      updateReadBtn(bookElement.querySelector(".readBtn"), book.isRead);
    }
  }
}

// update button 
function updateReadBtn(button, isRead) {
  button.textContent = isRead ? "Read" : "Not Read";
  button.style.backgroundColor = isRead ? "#198754" : "gray";
}

const form = document.querySelector(".add-form");
const addBtn = document.querySelector("#addBtn");
const closeBtn = document.querySelector(".close");

addBtn.addEventListener("click", () => {
  document.body.classList.add("overlay-active");
  form.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
  document.body.classList.remove("overlay-active");
  form.style.display = "none";
});

function formClosed() {
  document.body.classList.remove("overlay-active");
  form.style.display = "none";
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = form.querySelector("#title").value.trim();
  const author = form.querySelector("#author").value.trim();
  const pages = form.querySelector("#pages").value.trim();
  const isRead = form.querySelector("#read").checked;

  if (title && author && pages) {
    await addBookToLibrary(title, author, pages, isRead);
    form.reset();
    formClosed();
  }
});

function searchBookByTitle() {
  const searchInput = document.querySelector("#search").value.trim().toLowerCase();
  // get books from localstorage
  const storedBooks = loadLibrary(); 

  // filter the books that includes search terms
  const filteredBooks = storedBooks.filter(book => book.title.toLowerCase().includes(searchInput));

  // re-render the book shelf
  const bookShelf = document.querySelector(".book-shelf");
  bookShelf.innerHTML = ""; // clear the book content

  filteredBooks.forEach(book => {
    const bookElement = createBookElement(book);
    bookShelf.appendChild(bookElement);
  });
}

document.querySelector("#search").addEventListener("input", searchBookByTitle);

document.addEventListener("DOMContentLoaded", displayBookShelf);