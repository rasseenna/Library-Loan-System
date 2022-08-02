
/* shome.js */

import { customiseNavbar } from '../util.js'

export async function setup(node) {
	console.log('HOME: setup')
	try {
		console.log(node)
		document.querySelector('header p').innerText = 'Student Page'
		customiseNavbar(['shome', 'logout']) // navbar if logged in
		const token = localStorage.getItem('authorization')
		console.log(token)
		if(token === null) customiseNavbar(['home', 'login']) //navbar if logged out
		// add content to the page
		await sbookListing(node)
	} catch(err) {
		console.error(err)
	}
}

async function sbookListing(node) {

    const url = '/api/student'
	const options = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/vnd.api+json',
			'Authorization': localStorage.getItem('authorization')
		}
	}
	const response = await fetch(url, options)
	const bookoutput = await response.json()
	console.log('HERE STUDENT BOOK DEATILS')
	console.log(bookoutput)
	const template = document.querySelector('template#shomelisting')
	for(const slist of bookoutput.data.student_details) {
		const fragment = template.content.cloneNode(true)
		fragment.querySelector('h2').innerText = slist.title
		fragment.querySelector('h4').innerText = slist.author
		fragment.querySelector('p').innerText = slist.slider_quantity
		node.appendChild(fragment)
	}

	node.querySelector('form').addEventListener('submit', await searching)

}

async function searching() {
	
	event.preventDefault()
	const formData = new FormData(event.target)
	const data = Object.fromEntries(formData.entries())
	data.student = localStorage.getItem('username')
		console.log(data)
			const url = '/api/student'
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
		console.log('student home book search listing')
		console.log(json)
		const listhide = document.querySelector('template#shomelisting')
		listhide.style.visibility = 'hidden'
		const template = document.querySelector('template#sbooklist')
	    for(const srlist of json.data.student_detailss) {
			const fragment = template.content.cloneNode(true)
			fragment.querySelector('h2').innerText = srlist.title
			fragment.querySelector('h4').innerText = srlist.author
			fragment.querySelector('p').innerText = srlist.slider_quantity
			this.appendChild(fragment)
		}
		
		
}
