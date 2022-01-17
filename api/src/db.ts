//generar nuestra conexion con la db!

import { Sequelize } from 'sequelize-typescript';
import config from '../lib/config';
import { Carrier } from './models/Carrier';
import { Review } from './models/Review';
import { Travel } from './models/Travel';
import { User } from './models/User';
import { User_Reg } from './models/User_Reg';
import { Vehicle } from './models/Vehicle';
   
config; 
export const sequelize = new Sequelize({
	dialect: 'postgres',
	database: config.dbName,
	password: config.dbPassword,
	username: config.dbUser,
	storage: ':memory:',
	models: [__dirname + '/models'],
});

// User_Reg.hasOne(User)
// User.belongsTo(User_Reg)

// User_Reg.hasOne(Carrier)
// Carrier.belongsTo(User_Reg)

// Carrier.hasOne(Vehicle)
// Vehicle.belongsTo(Carrier)

// Travel.hasOne(Review)
// Review.belongsTo(Travel)

// User.hasMany(Travel);
// Travel.belongsTo(User);

// Carrier.hasMany(Travel)
// Travel.belongsTo(Carrier)
