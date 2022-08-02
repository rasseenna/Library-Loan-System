
/* routes.js */

import { Router } from 'https://deno.land/x/oak@v10.5.1/mod.ts'

import { extractCredentials, dataURLtoFile } from './modules/util.js'
import { login, register } from './modules/accounts.js'
import { addbook, booklists } from './modules/books.js'
import { userlists } from './modules/users.js'
import { student1lists } from './modules/student1list.js'
import { student2lists } from './modules/student2list.js'
import { studentdetails, searchdetails } from './modules/student.js'

const router = new Router()

// the routes defined here
router.get('/', async context => {
	console.log('GET /')
	context.response.headers.set('Content-Type', 'text/html')
	const data = await Deno.readTextFile('spa/index.html')
	context.response.body = data
})

router.get('/api/accounts', async context => {
	console.log('GET /api/accounts')
	const token = context.request.headers.get('Authorization')
	console.log(`auth: ${token}`)
	context.response.headers.set('Content-Type', 'application/json')
	try {
		const credentials = extractCredentials(token)
		console.log(credentials)
		const username = await login(credentials)
		console.log(`username: ${username}`)
		context.response.body = JSON.stringify(
			{
				data: { username }
			}, null, 2)
	} catch(err) {
		err.data = {
			code: 401,
			title: '401 Unauthorized',
			detail: err.message
		}
		throw err
	}
})

router.post('/api/accounts', async context => {
	console.log('POST /api/accounts')
	const body  = await context.request.body()
	const data = await body.value
	console.log(data)
	await register(data)
	context.response.status = 201
	context.response.body = JSON.stringify({ status: 'success', msg: 'account created' })
})

router.post('/api/books', async context => {
	console.log('POST /api/books')
	const body  = await context.request.body()
	const data = await body.value
	console.log(data)
	await addbook(data)
	context.response.status = 201
	context.response.body = JSON.stringify({ status: 'success', msg: 'book created' })
})

router.get('/api/books', async context => {
	console.log('GET /api/books')
	const token = context.request.headers.get('Authorization')
	console.log(`auth: ${token}`)
	context.response.headers.set('Content-Type', 'application/json')
	try {
		const credentials = extractCredentials(token)
		console.log(credentials)
		const username = await login(credentials)
		console.log(`the login username: ${username}`)
		const bookk = await booklists(username)
		console.log(`booklists: ${bookk}`)
		context.response.body = JSON.stringify(
			{
				data: { bookk }
			}, null, 2)
	} catch(err) {
		err.data = {
			code: 401,
			title: '401 Unauthorized',
			detail: err.message
		}
		throw err
	}
})

router.post('/api/student', async context => {
	console.log('POST /api/student')
	const body  = await context.request.body()
	const data = await body.value
	console.log(data)
	try {
		const student_detailss = await searchdetails(data)
			context.response.body = JSON.stringify(
			{
				data: { student_detailss }
			}, null, 2)
	} catch(err) {
		err.data = {
			code: 401,
			title: '401 Unauthorized',
			detail: err.message
		}
		throw err
	}

})

router.get('/api/student', async context => {
	console.log('GET /api/student')
	const token = context.request.headers.get('Authorization')
	console.log(`auth: ${token}`)
	context.response.headers.set('Content-Type', 'application/json')
	try {
		const credentials = extractCredentials(token)
		console.log(credentials)
		const username = await login(credentials)
		console.log(`the login username: ${username}`)
		const student_details = await studentdetails(username)
		console.log(`booklists: ${student_details}`)
		context.response.body = JSON.stringify(
			{
				data: { student_details }
			}, null, 2)
	} catch(err) {
		err.data = {
			code: 401,
			title: '401 Unauthorized',
			detail: err.message
		}
		throw err
	}
})


router.get('/api/users', async context => {
	console.log('GET /api/users')
	const token = context.request.headers.get('Authorization')
	console.log(`auth: ${token}`)
	context.response.headers.set('Content-Type', 'application/json')
	try {
		const credentials = extractCredentials(token)
		console.log(credentials)
		const userdetails = await userlists()
		console.log(`userdetails are: ${userdetails}`)
		context.response.body = JSON.stringify(
			{
				data: { userdetails }
			}, null, 2)
	} catch(err) {
		err.data = {
			code: 401,
			title: '401 Unauthorized',
			detail: err.message
		}
		throw err
	}
})

router.get('/api/student1list', async context => {
	console.log('GET /api/student1list')
	const token = context.request.headers.get('Authorization')
	console.log(`auth: ${token}`)
	context.response.headers.set('Content-Type', 'application/json')
	try {
		const credentials = extractCredentials(token)
		console.log(credentials)
		const user1details = await student1lists()
		console.log(`user1details are: ${user1details}`)
		context.response.body = JSON.stringify(
			{
				data: { user1details }
			}, null, 2)
	} catch(err) {
		err.data = {
			code: 401,
			title: '401 Unauthorized',
			detail: err.message
		}
		throw err
	}
})

router.get('/api/student2list', async context => {
	console.log('GET /api/student2list')
	const token = context.request.headers.get('Authorization')
	console.log(`auth: ${token}`)
	context.response.headers.set('Content-Type', 'application/json')
	try {
		const credentials = extractCredentials(token)
		console.log(credentials)
		const user2details = await student2lists()
		console.log(`userdetails are: ${user2details}`)
		context.response.body = JSON.stringify(
			{
				data: { user2details }
			}, null, 2)
	} catch(err) {
		err.data = {
			code: 401,
			title: '401 Unauthorized',
			detail: err.message
		}
		throw err
	}
})

router.post('/api/files', async context => {
	console.log('POST /api/files')
	try {
		const token = context.request.headers.get('Authorization')
		console.log(`auth: ${token}`)
		const body  = await context.request.body()
		const data = await body.value
		console.log(data)
		dataURLtoFile(data.base64, data.user)
		context.response.status = 201
		context.response.body = JSON.stringify(
			{
				data: {
					message: 'file uploaded'
				}
			}
		)
	} catch(err) {
		err.data = {
			code: 500,
			title: '500 Internal Server Error',
			detail: err.message
		}
		throw err
	}
})

export default router

