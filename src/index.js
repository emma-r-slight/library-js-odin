let libraryRow = document.getElementById('bookTable')
console.log(libraryRow)
let form = document.querySelector('form')

let myLibrary = []
let bookNum

function Book(title, author, numPages, read, reading) {
	this.title = title
	this.author = author
	this.numPages = numPages
	this.read = read
}

form.addEventListener('submit', (e) => {
	e.preventDefault()

	const title = form.elements[0].value
	const author = form.elements[1].value
	const numPages = form.elements[2].value
	const read = form.elements[3].checked

	const anItem = new Book(title, author, numPages, read)
	addBookToLibrary(anItem)
	form.reset()
})

function deleteRows() {
	const remove_btns = document.querySelectorAll('.remove')
	remove_btns.forEach((button) => {
		button.addEventListener('click', removeBookFromLibrary)
	})
}

function addBookToLibrary(anItem) {
	myLibrary.push(anItem)
	updateLocalStorage(myLibrary)
	updateLibrary()
}

function updateLibrary() {
	let localLibrary = getLibraryFromLocalStorage()

	libraryRow.innerHTML = ''
	localLibrary.forEach((item, index) => {
		let libraryItem = document.createElement('tr')
		libraryItem.setAttribute('data-index', index)
		bookNum = index + 1
		let beenRead
		if (item.read) {
			beenRead = 'checked'
		}
		libraryItem.innerHTML = `<td >${bookNum}</td><td>${item.title}</td><td>${item.author}</td><td>${item.numPages}</td><td><input type="checkbox" name="hasRead" ${beenRead}></td><td><a class="remove" title="delete"><i class="fa fa-wrapper fa-times"></i></a><td>`
		libraryRow.appendChild(libraryItem)
		let index2 = e.target.parentNode.getAttribute('data-index')
		console.log(index2)
		deleteRows()
	})
}

function removeBookFromLibrary(e) {
	// Get data-index from parent div
	let index = e.target.parentNode.getAttribute('data-index')
	myLibrary.splice(index, 1)
	updateLocalStorage()
	updateLibrary()
}

function getLibraryFromLocalStorage() {
	try {
		let localLibrary = JSON.parse(localStorage.getItem('myLibrary'))
		console.log(localLibrary)
		return localLibrary
	} catch (e) {
		console.log(e.code)
		return false
	}
}

function updateLocalStorage(myLibrary) {
	localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
}
