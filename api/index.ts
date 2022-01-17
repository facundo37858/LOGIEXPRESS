
import app from "./src/app";
import { sequelize } from "./src/db";
import axios from 'axios'
import { User_Reg } from "./src/models/User_Reg";
import { uuid } from "uuidv4";
import bcrypt from 'bcryptjs'
import { v4 } from "uuid";

interface error {
	err: string
}

// .replace(/[()]/g, '').replace(/[-]/g, '')

const resApiUsers = async () => {

	try {





		let users = await axios.get('https://randomuser.me/api/?results=10')
			.then(res => { return res.data })
			.then(async (users) => {
				let usersFilter = users.results.map((us: { name: { first: string; last: string }; phone: any, email: string, login: { password: string } }) => {

					// let passCrypt=await bcrypt.hash(us.login.password,8)

					return {
						id: v4(),
						name: us.name.first,
						lastName: us.name.last,
						phone: Number(us.phone.replace(/[()]/g, '').replace(/[-]/g, '')) ? Number(us.phone.replace(/[()]/g, '').replace(/[-]/g, '')) : null,
						eMail: us.email,
						password: bcrypt.hashSync(us.login.password, 8),//problemas cuando sean muchos datos!!!
						terminosCondiciones: true,
					}
				})
				return usersFilter
			})


		await User_Reg.bulkCreate(users)
			//.then((u) => { console.log(u) })

		return users






	} catch (e) {

		console.log(`error ${e}`)
	}

}
sequelize
	.sync({ force: true, logging: false })
	// .then(async () => {
	// 	// await resApiUsers()
		
	// })
	.then(() => {
		console.log('base de datos conectada! :D')
		app.listen(3001, function () {
			console.log('App is listening on port 3001!');
		});
	})
	.catch((err: error) => console.error(err));



