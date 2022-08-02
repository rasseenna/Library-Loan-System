
/* logout.js */

import { customiseNavbar, loadPage, showMessage } from '../util.js'

export async function setup(node) {
	try {
		console.log('LOGOUT: setup')
		const loginUser = localStorage.getItem('username')
		if((loginUser == 'librarian1' ) || (loginUser == 'librarian2'))
		{
			customiseNavbar(['home'])
		} else if((loginUser == 'student1' ) || (loginUser == 'student2'))
		{
			customiseNavbar(['shome'])
		}
		
		node.querySelectorAll('button').forEach( button => button.addEventListener('click', event => {
			console.log(event.target.innerText)
			if(event.target.innerText === 'OK') {
				localStorage.removeItem('username')
				localStorage.removeItem('authorization')
				loadPage('login')
				showMessage('You LogOut Successfully !!!!!')
			} else {
				loadPage('login')
			}
		}))
	} catch(err) {
		console.error(err)
	}
}
