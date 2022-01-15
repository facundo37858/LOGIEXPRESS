import { Response, Request, Router, NextFunction } from 'express';
 const { Op } = require("sequelize");
 import { uuid } from 'uuidv4';
 
import { Travel } from '../models/Travel';
import { User } from '../models/User';
import { Carrier } from '../models/Carrier';
import { Vehicle } from '../models/Vehicle';

 var userFake=[{
		
		"name":"Allan",
		"lastName":"Torres",
		"password": "passwordHash",
		"phone":"+584121222392",
		"terminosCondiciones":true,
		"eMail":"allaneduardot@gmail.com",
		"role":false
	},{
		
		"name":"Eliana",
		"lastName":"Henry",
		"password": "passwordHash",
		"phone":"+584121222392",
		"terminosCondiciones":true,
		"eMail":"elianahenry@gmail.com",
		"role":false
	},{
		
		"name":"Facu",
		"lastName":"Henry",
		"password": "passwordHash",
		"phone":"+584234234",
		"terminosCondiciones":true,
		"eMail":"Facuhenry@gmail.com",
		"role":false
	},{
		
		"name":"Luis",
		"lastName":"Henry",
		"password": "passwordHash",
		"phone":"+5354534554",
		"terminosCondiciones":true,
		"eMail":"Luishenry@gmail.com",
		"role":false
	},{
		"name":"Gonza",
		"lastName":"Henry",
		"password": "passwordHash",
		"phone":"+34522323422",
		"terminosCondiciones":true,
		"eMail":"Gonzahenry@gmail.com",
		"role":false
	},{
		"name":"Maca",
		"lastName":"Henry",
		"password": "passwordHash",
		"phone":"+234234234",
		"terminosCondiciones":true,
		"eMail":"Macahenry@gmail.com",
		"role":false
	},{
		"name":"Fredy",
		"lastName":"Henry",
		"password": "passwordHash",
		"phone":"+6534534534",
		"terminosCondiciones":true,
		"eMail":"Fredyhenry@gmail.com",
		"role":false
	},{
		"name":"Matias",
		"lastName":"HenryHero",
		"password": "passwordHash",
		"phone":"+6534534534",
		"terminosCondiciones":true,
		"eMail":"MatiashenryHero@gmail.com",
		"role":false
	},{
		"name":"Franco",
		"lastName":"Teacher",
		"password": "passwordHash",
		"phone":"+6534534534",
		"terminosCondiciones":true,
		"eMail":"FrancoTeacherHenry@gmail.com",
		"role":false
	},{
		"name":"Martina",
		"lastName":"Teacher",
		"password": "passwordHash",
		"phone":"+24242334534",
		"terminosCondiciones":true,
		"eMail":"MartinaTeacherHenry@gmail.com",
		"role":false
	}
];
const router = Router()
router.get('/', (req: Request, res: Response) => {
	res.send('Allan Torres');
});


function getDistanciaMetros(origen:string, destino:string) {
    var newOrigen = origen.split(",")
    var newDestino = destino.split(",")
    var lat1 = newOrigen[0];
    var lon1 = newOrigen[1];
    var lat2 = newDestino[0];
    var lon2 = newDestino[1];
    var rad = function (x:number) { return x * Math.PI / 180; }
    var R = 6378.137; //Radio de la tierra en km 
    var dLat = rad(parseFloat(lat2) - parseFloat(lat1));
    var dLong = rad(parseFloat(lon2) - parseFloat(lon1));
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(parseFloat(lat1))) *
        Math.cos(rad(parseFloat(lat2))) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    //aquí obtienes la distancia en metros por la conversion 1Km =1000m
    var d = R * c * 1000;
    return d / 1000;
}

router.post('/calculatePrice', (req: Request, res: Response) => {
//226.49013972673578
//price 45298,0279
try {
	console.log(req.body)
	const { origen, destino , weight } = req.body
  // var destino= "-26.8082848,-65.2175903"
  // var origen= "-24.7821269,-65.4231976"
  // let weight= 20;
 let distance= getDistanciaMetros(origen,destino);
   const valor = 10; /// valor de tonelada por km recorrido
   let price = valor * (weight * distance);
   
   res.send({price});
} catch (error) {
	console.log("Error", error)
}
	
});


router.post('/requestTravel', async (req: Request, res: Response, next: NextFunction) => {
	 
	 const { id, orig, destination, weight, price, description } = req.body


  try {
		var newViaje = {
			id: uuid(),
			orig,
			destination,
			weight,
			price,
			description,
			UserId: id
		}
		
		 // let travel = await User.create({id: 'd8c21800-db1e-4a11-802b-4728efc47ef3'})
		 // let travel = await User.create({id: 'd8c21800-db1e-4a11-802b-4728efc47exc'})
		
        let user = await Travel.create(newViaje)
		
        const carriers = await Carrier.findAll()
             let tam= carriers.length
             for(let i=0; i < tam; i++){
             	console.log(carriers[i].id)
              	      var vehicles = await Vehicle.findAll({where:{
                    	CarrierId:carriers[i].id,
          	            capacity:{[Op.or]:{[Op.eq]: weight,[Op.gt]: weight}}
         }
        }) 
        console.log(vehicles) 
        return res.send(vehicles);
    }
    	
		res.send("");

	} catch (err) {
		next(err)
	}

});


export default router;