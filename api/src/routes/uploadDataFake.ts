import { Response, Request, Router, NextFunction } from 'express';
 const { Op } = require("sequelize");
 import { uuid } from 'uuidv4';
 
import { Travel } from '../models/Travel';
import { User } from '../models/User';
import { User_Reg } from '../models/User_Reg';
import { Carrier } from '../models/Carrier';
import { Vehicle } from '../models/Vehicle';

 var userFake=[
 {
		id: uuid(),
		name:"Allan",
		lastName:"Torres",
		password: "passwordHash",
		phone:"+584121222392",
		terminosCondiciones:true,
		eMail:"allaneduardot@gmail.com",
		role:false
	},{
		id: uuid(),
		name:"Eliana",
		lastName:"Henry",
		password: "passwordHash",
		phone:"+584121222392",
		terminosCondiciones:true,
		eMail:"elianahenry@gmail.com",
		role:false
	},{
		id: uuid(),
		name:"Facu",
		lastName:"Henry",
		password: "passwordHash",
		phone:"+584234234",
		terminosCondiciones:true,
		eMail:"Facuhenry@gmail.com",
		role:false
	},{
		id: uuid(),
		name:"Luis",
		lastName:"Henry",
		password: "passwordHash",
		phone:"+5354534554",
		terminosCondiciones:true,
		eMail:"Luishenry@gmail.com",
		role:false
	},{
		id: uuid(),
		name:"Gonza",
		lastName:"Henry",
		password: "passwordHash",
		phone:"+34522323422",
		terminosCondiciones:true,
		eMail:"Gonzahenry@gmail.com",
		role:false
	},{
		id: uuid(),
		name:"Maca",
		lastName:"Henry",
		password: "passwordHash",
		phone:"+234234234",
		terminosCondiciones:true,
		eMail:"Macahenry@gmail.com",
		role:false
	},{
		id: uuid(),
		name:"Fredy",
		lastName:"Henry",
		password: "passwordHash",
		phone:"+6534534534",
		terminosCondiciones:true,
		eMail:"Fredyhenry@gmail.com",
		role:false
	},{
		id: uuid(),
		name:"Matias",
		lastName:"HenryHero",
		password: "passwordHash",
		phone:"+6534534534",
		terminosCondiciones:true,
		eMail:"MatiashenryHero@gmail.com",
		role:false
	},{
		id: uuid(),
		name:"Franco",
		lastName:"Teacher",
		password: "passwordHash",
		phone:"+6534534534",
		terminosCondiciones:true,
		eMail:"FrancoTeacherHenry@gmail.com",
		role:false
	},{
		id: uuid(),
		name:"Martina",
		lastName:"Teacher",
		password: "passwordHash",
		phone:"+24242334534",
		terminosCondiciones:true,
		eMail:"MartinaTeacherHenry@gmail.com",
		role:false
	}
];
var carrierFake = [{			
            id:"09135748-3751-40fe-b016-a6a601cc42cc",
			documentID: "15187193",
			license: "2002022",
			eMail: "a@gmail.com",
			phone: 121211212,
			location: "0000000, 111111",
			CBU: "225114"
 },{			
            id:"1b8ed2d7-1660-4fd0-a7e7-049a533d543d",
			documentID: "3033333",
			license: "11111111",
			eMail: "allanedurdot@gmail.com",
			phone: 121211212,
			location: "2222222, 33333",
			CBU: "1324234"
		},{			
            id:"1cdf84c7-4096-4136-9783-463ea992b637",
			documentID: "1e123d1",
			license: "11111111",
			eMail: "allanedurdot@gmail.com",
			phone: 0,
			location: "4444444, 33333",
			CBU: "03039393"
		},{			
            id:"236af201-b546-4b8c-bf21-28c96d5970f1",
			documentID: "documentoIDGonza",
			license: "linceiaGonza",
			eMail: "allanedurdot@gmail.com",
			phone: 0,
			location: "444224,121212",
			CBU: "0303939asd"
		},{			
            id:"49824efe-37c5-4389-8a72-14822899dd9c",
			documentID: "documentoIDFranco",
			license: "linceiaFranco",
			eMail: "allanedurdot@gmail.com",
			phone: 0,
			location: "44asda4,0000212",
			CBU: "0303939asd"
		},{			
            id:"7fd536f3-f760-4372-8894-044c1e99a872",
			documentID: "documentoIDLuis",
			license: "linceiaLuis",
			eMail: "allanedurdot@gmail.com",
			phone: 0,
			location: "33433434,0000212",
			CBU: "3343434q43"
		},{			
            id:"a015ed83-8692-4c4f-af1e-c4a6df4e1fb9",
			documentID: "documentoIDMAtias",
			license: "linceiaMatias",
			eMail: "allanedurdot@gmail.com",
			phone: 0,
			location: "Ubicacion,Matias",
			CBU: "CBUMatias"
		},{			
            id:"b85f6147-3482-42a0-b00c-266710367275",
			documentID: "documentoIDMartina",
			license: "linceiaMartina",
			eMail: "allanedurdot@gmail.com",
			phone: 0,
			location: "Ubicacion,Martina",
			CBU: "CBUMartina"
		},{			
            id:"d281c6f7-29c6-4c9c-8b03-6fc90e4282ba",
			documentID: "documentoIDEliana",
			license: "linceiaEliana",
			eMail: "allanedurdot@gmail.com",
			phone: 0,
			location: "Ubicacion,Eliana",
			CBU: "CBUEliana"
		},{			
            id:"e2bc48a0-cb4c-48a4-ad08-cf13f5079b6e",
			documentID: "documentoIDFacu",
			license: "linceiaFacu",
			eMail: "allanedurdot@gmail.com",
			phone: 0,
			location: "Ubicacion,Facu",
			CBU: "CBUFacu"
		}]
		var vehicleFake = [{
			id: uuid(),
            brand:"Toyota",
			patent:"3e3eed3",
			model:0,
			color:"azul",
			capacity:5,
			CarrierId:"09135748-3751-40fe-b016-a6a601cc42cc"
			
 },{		
 			id: uuid(),
            brand:"Jeep",
			patent:"34r4r4rr",
			model:0,
			color:"amarillo",
			capacity:7,
			CarrierId:"1b8ed2d7-1660-4fd0-a7e7-049a533d543d"
			
		},{	
			id: uuid(),
            brand:"audi",
			patent:"3efef3d4r4rr",
			model:0,
			color:"negro",
			capacity:8,
			CarrierId:"1cdf84c7-4096-4136-9783-463ea992b637"
			
		},{	
			id: uuid(),
            brand:"caliber",
			patent:"3efef3d4r4rr",
			model:0,
			color:"rojo",
			capacity:2,
			CarrierId:"236af201-b546-4b8c-bf21-28c96d5970f1"
			
		},{	
			id: uuid(),
            brand:"chevrolet",
			patent:"3efef3d4r4rr",
			model:0,
			color:"rojo",
			capacity:4,
			CarrierId:"49824efe-37c5-4389-8a72-14822899dd9c"
			
		},{	
			id: uuid(),
            brand:"toyota",
			patent:"3efes4444",
			model:0,
			color:"azul",
			capacity:1,
			CarrierId:"7fd536f3-f760-4372-8894-044c1e99a872"
			
		},{	
			id: uuid(),
            brand:"toyota",
			patent:"3efes4444",
			model:0,
			color:"amarillo",
			capacity:12,
			CarrierId:"a015ed83-8692-4c4f-af1e-c4a6df4e1fb9"
			
		},{	
			id: uuid(),
            brand:"audi",
			patent:"30jkij89j9",
			model:0,
			color:"rojo",
			capacity:8,
			CarrierId:"b85f6147-3482-42a0-b00c-266710367275"
			
		},{
			id: uuid(),
            brand:"toyota",
			patent:"30jkij89j9",
			model:0,
			color:"gris",
			capacity:10,
			CarrierId:"d281c6f7-29c6-4c9c-8b03-6fc90e4282ba"
			
		},{			
			id: uuid(),
            brand:"lamborgini",
			patent:"30jkij89j9",
			model:0,
			color:"negro",
			capacity:2,
			CarrierId:"e2bc48a0-cb4c-48a4-ad08-cf13f5079b6e"
		}]
const router = Router()
router.get('/uploadDataFake', async(req: Request, res: Response) => {
            const user_regs= await User_Reg.bulkCreate(userFake);
           let carrier = await Carrier.bulkCreate(carrierFake);
           let track = await Vehicle.bulkCreate(vehicleFake);   
	res.send("uploadDataFake Ok");
});



export default router;