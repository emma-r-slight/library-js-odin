let libraryRow = document.getElementById('bookTable')
console.log(libraryRow)
let form = document.querySelector('form')
let myLibrary = []

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

function addBookToLibrary(anItem) {
	myLibrary.push(anItem)
	updateLocalStorage(myLibrary)
	updateLibrary()
}

function updateLibrary() {
	let localLibrary = getLibraryFromLocalStorage()
	let idNum = 3

	libraryRow.innerHTML = ''
	localLibrary.forEach((item, index) => {
		let libraryItem = document.createElement('tr')
		libraryItem.setAttribute('data-index', index)
		let beenRead
		if (item.read) {
			beenRead = 'checked'
		}
		libraryItem.innerHTML = `
														<td>${idNum++}</td>
														<td>${item.title}</td>
														<td>${item.author}</td>
														<td>${item.numPages}</td>
														<td><input type="checkbox" name="hasRead" ${beenRead}></td>
														`
		libraryRow.appendChild(libraryItem)
	})
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
