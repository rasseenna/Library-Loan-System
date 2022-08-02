
/* login.js */

import { createToken, customiseNavbar, loadPage, showMessage } from '../util.js'

export async function setup(node) {
	try {
		console.log('LOGIN: setup')
		console.log(node)
		document.querySelector('header p').innerText = 'Login Page'
		customiseNavbar(['login','register'])
		node.querySelector('form').addEventListener('submit', await login)
	} catch(err) {
		console.error(err)
	}
}

async function login() {
	event.preventDefault()
	console.log('form submitted')

	const formData = new FormData(event.target)
	const data = Object.fromEntries(formData.entries())
	const token = 'Basic ' + btoa(`${data.user}:${data.pass}`)
	const options = {
		method: 'GET',
		headers: {
			'Authorization': token,
			'Content-Type': 'application/vnd.api+json',
			'Accept': 'application/vnd.api+json'
		}
	}
	const response = await fetch('/api/accounts', options)
	const json = await response.json()

	if(response.status === 200) {
		localStorage.setItem('username', json.data.username)
		localStorage.setItem('authorization', token)
		showMessage(`WELCOME  ${json.data.username} !!!!!!`)
		const usercheck = json.data.username
		if((usercheck == 'librarian1' ) || (usercheck == 'librarian2'))
		{ 
			await loadPage('home')
		} else if ((usercheck == 'student1' ) || (usercheck == 'student2'))
		{
			await loadPage('shome')
		}
	} else {
		document.querySelector('input[name="pass"]').value = ''
		showMessage(json.errors[0].detail)
	}

}
