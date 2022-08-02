/* student.js.js */

import { compare, genSalt, hash } from 'https://deno.land/x/bcrypt@v0.3.0/mod.ts'
import { db } from './db.js'

const saltRounds = 10
const salt = await genSalt(saltRounds)


export async function studentdetails(student) {

    const sql = `select * from studentloan,bookdetails where studentloan.book_title = bookdetails.title and studentloan.uuid = bookdetails.uuid and student_name = "${student}";`
	console.log(sql)
	const records = await db.query(sql)
	console.log(records)
	return records
}

export async function searchdetails(credentials) {

    const sql = `select * from studentloan,bookdetails where studentloan.book_title = bookdetails.title and studentloan.uuid = bookdetails.uuid and studentloan.student_name = "${credentials.student}" and (studentloan. book_title like "%${credentials.search}%" or bookdetails. author like "%${credentials.search}%");`
	console.log(sql)
	const records = await db.query(sql)
	console.log(records)
	return records
}