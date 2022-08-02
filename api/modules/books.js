/* books.js */

import { compare, genSalt, hash } from 'https://deno.land/x/bcrypt@v0.3.0/mod.ts'
import { db } from './db.js'

const saltRounds = 10
const salt = await genSalt(saltRounds)


export async function addbook(credentials) {
 
 		const sql = `INSERT INTO bookdetails(title, author, isbn, dewey_number, slider_quantity, loan_period, librarian, uuid) VALUES ("${credentials.name}","${credentials.author}","${credentials.isbn}","${credentials.dewey}","${credentials.sliderValue}","${credentials.loanPeriod}","${credentials.librarian}",UUID());`
		console.log(sql)
		await db.query(sql)
		return true

}
export async function booklists(librarian) {
	console.log(librarian)
    const sql = `SELECT DISTINCT title, author, slider_quantity FROM bookdetails WHERE librarian = "${librarian}";`
	 console.log(sql)
	const records = await db.query(sql)
	console.log(records)
	return records
}