
/* home.js */

import { customiseNavbar } from '../util.js'

export async function setup(node) {
	console.log('HOME: setup')
	try {
		console.log(node)
		document.querySelector('header p').innerText = 'Home'
		customiseNavbar(['home', 'addbook', 'manageuser', 'logout']) // navbar if logged in
		const token = localStorage.getItem('authorization')
		console.log(token)
		if(token === null) customiseNavbar(['register','login']) //navbar if logged out
		// add content to the page
		await bookListing(node)
	} catch(err) {
		console.error(err)
	}
}

async function bookListing(node) {
	const librarian = localStorage.getItem('username')
    window.sessionStorage.setItem('loginuser',librarian)
    const url = '/api/books'
	const options = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/vnd.api+json',
			'Authorization': localStorage.getItem('authorization')
		}
	}
	const response = await fetch(url, options)
	const bookoutput = await response.json()
	console.log('In Home Page')
	console.log(bookoutput)
	const template = document.querySelector('template#booklist')
	for(const booklist of bookoutput.data.bookk) {
		const fragment = template.content.cloneNode(true)
		fragment.querySelector('h2').innerText = booklist.title
		fragment.querySelector('h4').innerText = booklist.author
		fragment.querySelector('p').innerText = booklist.slider_quantity
		node.appendChild(fragment)
	}
}

