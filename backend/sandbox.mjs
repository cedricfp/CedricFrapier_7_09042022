import { addUser } from './models/user.js'
// prenom, nom, pseudo, email, password, role

;(async () => {
	try {
		const user = {
			firstname: 'Paul',
			lastname: 'Dupont',
			email: 'paul@gmail.com',
			password: 'password',
			role: 0
		}
		const response = await addUser(user)
		return console.log(response)
	} catch (error) {
		return console.log(error)
	}
})()
