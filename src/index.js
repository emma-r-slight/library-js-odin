let libraryRow = document.querySelector('#displayBooks')
let form = document.querySelector('form')
let mylibrary = []

function Book(title, author, numPages, read) {
	this.title = title
	this.author = author
	this.numPages = numPages
	this.read = read
}

form.addEventListener('submit', handleBookForm)

function handleBookForm(e) {
	e.preventDefault()
	const title = form.elements[0].value
	const author = form.elements[1].value
	const numPages = form.elements[2].value
	const read = form.elements[3].value
	const book = new Book(title, author, numPages, read)
	addBookToLibrary()
	form.reset()
}

function addBookToLibrary(book) {
	mylibrary.push(book)
	updateLocalStorage()
	updateLibrary()
}

function updateLibrary() {
	libraryRow.innerHTML = ''
	mylibrary.forEach((item, index) => {
		let book = document.createElement('tr')
	})
}

function updateLocalStorage() {
	localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
}
