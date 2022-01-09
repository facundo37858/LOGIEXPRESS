
import app from "./src/app";
import { sequelize } from "./src/db";

interface error {
	err: string
}
sequelize
	.sync({ force: false, logging: false })
	.then(() => {
		console.log('base de datos conectada! :D')
		app.listen(3001, function () {
			console.log('App is listening on port 3001!');
		});
	})
	.catch((err: error) => console.error(err));