
/* addbook.js */

import { customiseNavbar, loadPage, showMessage } from '../util.js'

export async function setup(node) {
	try {
		console.log('ADD BOOK: setup')
		console.log(node)
		document.querySelector('header p').innerText = 'Create a Book'
		customiseNavbar(['home', 'addbook', 'manageuser', 'logout'])
		node.querySelector('form').addEventListener('submit', await addbook)
	} catch(err) { // this will catch any errors in this script
		console.error(err)
	}
}

async function addbook() {
	event.preventDefault()
	const formData = new FormData(event.target)
	const data = Object.fromEntries(formData.entries())
	data.librarian = localStorage.getItem('username')
	if((data.name == "") || (data.author == "") || (data.isbn == "") || (data.dewey == "") || (data.sliderValue == "") || (data.loanPeriod == ""))
	{
		console.log(data)
		showMessage('please fill all the fields.')
		loadPage('addbook')

	}else{
		if((data.isbn.length < 13) || (data.isbn.length > 13))
		{
			console.log(data)
			showMessage('please enter 13 digit ISBN number')
			loadPage('addbook')	
		}else if(isNaN(data.isbn))
		{
			console.log(data)
			showMessage('please enter 13 digit ISBN number')
			loadPage('addbook')
		} else {
		console.log(data)

		const quantity = parseInt(data.sliderValue)
		for (let i = 1; i <= quantity; i++) {
			const url = '/api/books'
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/vnd.api+json',
				'Authorization': localStorage.getItem('authorization')
			},
			body: JSON.stringify(data)
		}
		const response = await fetch(url, options)
		const json = await response.json()
		console.log(json)
		}
		
		showMessage('new book created')
		loadPage('home')
		}
	}
}

