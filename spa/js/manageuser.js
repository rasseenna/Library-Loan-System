
/* manageuser.js */

import { customiseNavbar } from '../util.js'

export async function setup(node) {
	console.log('HOME: setup')
	try {
		console.log(node)
		document.querySelector('header p').innerText = 'Manage User'
		customiseNavbar(['home', 'addbook', 'manageuser', 'logout']) // navbar if logged in
		const token = localStorage.getItem('authorization')
		console.log(token)
		if(token === null) customiseNavbar(['login']) //navbar if logged out
		// add content to the page
		await userListing(node)
	} catch(err) {
		console.error(err)
	}
}

async function userListing(node) {

	const librarian = localStorage.getItem('username')
    window.sessionStorage.setItem('loginuser',librarian)
    const url = '/api/users'
	const options = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/vnd.api+json',
			'Authorization': localStorage.getItem('authorization')
		}
	}
	const response = await fetch(url, options)
	const bookoutput = await response.json()
	console.log('MANAGE USER')
	console.log(bookoutput)
	const template = document.querySelector('template#userlist')
	for(const studentlist of bookoutput.data.userdetails) {
		const fragment = template.content.cloneNode(true)
		fragment.querySelector('h2').innerText = studentlist.student_name
		fragment.querySelector('h4').innerText = studentlist.book_title
		fragment.querySelector('p').innerText = studentlist.due_date
		node.appendChild(fragment)
	}
	
}

