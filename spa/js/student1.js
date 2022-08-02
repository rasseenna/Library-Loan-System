
/* student1.js */

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
	await student1listing(node)
	} catch(err) {
		console.error(err)
	}
}

async function student1listing(node) {
    const url = '/api/student1list'
	const options = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/vnd.api+json',
			'Authorization': localStorage.getItem('authorization')
		}
	}
	const response = await fetch(url, options)
	const studentoutput = await response.json()
	console.log('STUDENT1 DETAILS')
	console.log(studentoutput)
	const template = document.querySelector('template#student1list')
	for(const student1list of studentoutput.data.user1details) {
		const fragment = template.content.cloneNode(true)
		fragment.querySelector('h2').innerText = student1list.student_name
		fragment.querySelector('h4').innerText = student1list.book_title
		fragment.querySelector('p').innerText = student1list.due_date
        if(student1list.check_out == ""){
			const button = document.createElement('button')
			button.innerText = 'Return Back'
			button.id = 'bookreturn'
			node.appendChild(button)
		}
		node.appendChild(fragment)
	}

}

