/* users.js */

import { compare, genSalt, hash } from 'https://deno.land/x/bcrypt@v0.3.0/mod.ts'
import { db } from './db.js'

const saltRounds = 10
const salt = await genSalt(saltRounds)


export async function userlists() {

    const sql = `SELECT * FROM studentloan ORDER BY due_date DESC;`
	console.log(sql)
	const records = await db.query(sql)
	console.log(records)
	return records
}