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
		id: '360208c5-551c-4825-afc5-b05a0e4c9a62',
		name:"Nemesio",
		lastName:"Andara",
		password: "passwordHash",
		phone:"+584121222392",
		terminosCondiciones:true,
		eMail:"NemesioAndara@gmail.com",
		role:true
	},{
		id: '7d06a399-d1a0-4050-a388-eca747b5f762',
		name:"Marcos",
		lastName:"Cordoba",
		password: "passwordHash",
		phone:"+584121222392",
		terminosCondiciones:true,
		eMail:"marcoscordoba@gmail.com",
		role:true
	},{
		id: '90fd0c76-8459-4eda-972a-8be589f8f694',
		name:"Alejandro",
		lastName:"Casadiego",
		password: "passwordHash",
		phone:"+584121222392",
		terminosCondiciones:true,
		eMail:"alejandrocasadiego@gmail.com",
		role:true
	},{
		id: '0029abfb-cc79-4624-aede-aeff02ca4968',
		name:"Allan",
		lastName:"Torres",
		password: "passwordHash",
		phone:"+584121222392",
		terminosCondiciones:true,
		eMail:"allaneduardot@gmail.com",
		role:false
	},{
		id: '0fe1f9b6-a3d5-4d34-8026-1e239c5a3ef9',
		name:"Eliana",
		lastName:"Henry",
		password: "passwordHash",
		phone:"+584121222392",
		terminosCondiciones:true,
		eMail:"elianahenry@gmail.com",
		role:false
	},{
		id: '3840c5ad-a72d-40b7-bd27-46db1e27d481',
		name:"Facu",
		lastName:"Henry",
		password: "passwordHash",
		phone:"+584234234",
		terminosCondiciones:true,
		eMail:"Facuhenry@gmail.com",
		role:false
	},{
		id: '3b44d0d9-615f-4ea3-bd81-8557b739ce00',
		name:"Luis",
		lastName:"Henry",
		password: "passwordHash",
		phone:"+5354534554",
		terminosCondiciones:true,
		eMail:"Luishenry@gmail.com",
		role:false
	},{
		id: '503296d5-4da6-4d22-a591-4a9d647ee4b4',
		name:"Gonza",
		lastName:"Henry",
		password: "passwordHash",
		phone:"+34522323422",
		terminosCondiciones:true,
		eMail:"Gonzahenry@gmail.com",
		role:false
	},{
		id: '86b689c8-6a1a-4e93-aed9-2d60b89b51ad',
		name:"Maca",
		lastName:"Henry",
		password: "passwordHash",
		phone:"+234234234",
		terminosCondiciones:true,
		eMail:"Macahenry@gmail.com",
		role:false
	},{
		id: 'b17aacfa-0bd6-4ef8-8825-4ad417082715',
		name:"Fredy",
		lastName:"Henry",
		password: "passwordHash",
		phone:"+6534534534",
		terminosCondiciones:true,
		eMail:"Fredyhenry@gmail.com",
		role:false
	},{
		id: 'b42586c3-02b3-4966-95a0-89b0b35c958d',
		name:"Matias",
		lastName:"HenryHero",
		password: "passwordHash",
		phone:"+6534534534",
		terminosCondiciones:true,
		eMail:"MatiashenryHero@gmail.com",
		role:false
	},{
		id: 'e30eef12-d9e6-4eb3-82e5-3d4277ebd92c',
		name:"Franco",
		lastName:"Teacher",
		password: "passwordHash",
		phone:"+6534534534",
		terminosCondiciones:true,
		eMail:"FrancoTeacherHenry@gmail.com",
		role:false
	},{
		id: 'e4457da8-be02-4757-864a-ee8a551c63c1',
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
			CBU: "225114",
			UserRegId: '0029abfb-cc79-4624-aede-aeff02ca4968'
 },{			
            id:"1b8ed2d7-1660-4fd0-a7e7-049a533d543d",
			documentID: "3033333",
			license: "11111111",
			eMail: "allanedurdot@gmail.com",
			phone: 121211212,
			location: "2222222, 33333",
			CBU: "1324234",
			UserRegId: '0fe1f9b6-a3d5-4d34-8026-1e239c5a3ef9'
		},{			
            id:"1cdf84c7-4096-4136-9783-463ea992b637",
			documentID: "1e123d1",
			license: "11111111",
			eMail: "allanedurdot@gmail.com",
			phone: 0,
			location: "4444444, 33333",
			CBU: "03039393",
			UserRegId: '3840c5ad-a72d-40b7-bd27-46db1e27d481'
		},{			
            id:"236af201-b546-4b8c-bf21-28c96d5970f1",
			documentID: "documentoIDGonza",
			license: "linceiaGonza",
			eMail: "allanedurdot@gmail.com",
			phone: 0,
			location: "444224,121212",
			CBU: "0303939asd",
			UserRegId: '3b44d0d9-615f-4ea3-bd81-8557b739ce00'
		},{			
            id:"49824efe-37c5-4389-8a72-14822899dd9c",
			documentID: "documentoIDFranco",
			license: "linceiaFranco",
			eMail: "allanedurdot@gmail.com",
			phone: 0,
			location: "44asda4,0000212",
			CBU: "0303939asd",
			UserRegId: '503296d5-4da6-4d22-a591-4a9d647ee4b4'
		},{			
            id:"7fd536f3-f760-4372-8894-044c1e99a872",
			documentID: "documentoIDLuis",
			license: "linceiaLuis",
			eMail: "allanedurdot@gmail.com",
			phone: 0,
			location: "33433434,0000212",
			CBU: "3343434q43",
			UserRegId: '86b689c8-6a1a-4e93-aed9-2d60b89b51ad'
		},{			
            id:"a015ed83-8692-4c4f-af1e-c4a6df4e1fb9",
			documentID: "documentoIDMAtias",
			license: "linceiaMatias",
			eMail: "allanedurdot@gmail.com",
			phone: 0,
			location: "Ubicacion,Matias",
			CBU: "CBUMatias",
			UserRegId: 'b17aacfa-0bd6-4ef8-8825-4ad417082715'
		},{			
            id:"b85f6147-3482-42a0-b00c-266710367275",
			documentID: "documentoIDMartina",
			license: "linceiaMartina",
			eMail: "allanedurdot@gmail.com",
			phone: 0,
			location: "Ubicacion,Martina",
			CBU: "CBUMartina",
			UserRegId: 'b42586c3-02b3-4966-95a0-89b0b35c958d'
		},{			
            id:"d281c6f7-29c6-4c9c-8b03-6fc90e4282ba",
			documentID: "documentoIDEliana",
			license: "linceiaEliana",
			eMail: "allanedurdot@gmail.com",
			phone: 0,
			location: "Ubicacion,Eliana",
			CBU: "CBUEliana",
			UserRegId: 'e30eef12-d9e6-4eb3-82e5-3d4277ebd92c'
		},{			
            id:"e2bc48a0-cb4c-48a4-ad08-cf13f5079b6e",
			documentID: "documentoIDFacu",
			license: "linceiaFacu",
			eMail: "allanedurdot@gmail.com",
			phone: 0,
			location: "Ubicacion,Facu",
			CBU: "CBUFacu",
			UserRegId: 'e4457da8-be02-4757-864a-ee8a551c63c1'
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
	var idUser=[
	{
      id: '973ee39e-40ad-4b8f-aa71-70ea7d99ac33',
    identification: 765765,
     zone: "string1",
       phone:9898999,
       photo: 'fotostring1',
       account: 'accountstring1',
    UserRegId: '360208c5-551c-4825-afc5-b05a0e4c9a62'
	},
	{
      id: 'cdcd30ba-6ab1-41bc-a5d0-b010439aa223',
      identification: 989879,
     zone: "string2", 
     phone:121312,
     photo: 'fotostring2',
     account: 'accountstring2',
    UserRegId: "7d06a399-d1a0-4050-a388-eca747b5f762"
	},
	{
      id: 'd4053632-8539-46d6-be65-066212006b99',
    identification: 123234,
    zone: "string3", 
    phone:4653442,
    photo: 'fotostring3',
    account: 'accountstring3',
    UserRegId: "90fd0c76-8459-4eda-972a-8be589f8f694"
	}
	]	


	
const router = Router()
 router.get('/uploadDataFake', async(req: Request, res: Response) => {
             const user_regs= await User_Reg.bulkCreate(userFake);
            let carrier = await Carrier.bulkCreate(carrierFake);
            let track = await Vehicle.bulkCreate(vehicleFake); 
    //const userTrue = await User_Reg.findAll({where:{role:true},attributes:[['id','UserRegId']]})  
             const userTrues = await User.bulkCreate(idUser);  
	res.send("Create Data Fake");
});



export default router;