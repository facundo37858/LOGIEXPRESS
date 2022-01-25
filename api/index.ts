import app from "./src/app";
import { Travel } from './src/models/Travel';
import { User } from './src/models/User';
import { User_Reg } from './src/models/User_Reg';
import { Carrier } from './src/models/Carrier';
import { sequelize } from "./src/db";
import { uuid } from 'uuidv4';
import { callbackify } from "util";

const { Op } = require("sequelize");
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: "*" } });
interface error {
    err: string
}
///begin Sokets


io.on("connection", (socket: any) => {
    console.log("User conneted: " + socket.id)

    ///codigo de chat    
	 //en este sockets creamos una sala solo para el User y Carrier que partician
   //en un Travel, recibiendo por el parametro data id de la tabla travel
   //creando un room con el nombre del id recibido paa que sea unico
socket.on("join_room",async (data:any, callback:any) => {
    //Socket join es el que se encarga de drear el room  
    socket.join(data);
       //en la variable sizeRoom tenemos la cantidad de personas que estan conectadas 
       //en esta sala, con esta variabel sabremos si ambos estan conectados
     var sizeRoom = io.sockets.adapter.rooms.get(data)
   
      console.log(sizeRoom.size);
  
      console.log(`User with ID: ${socket.id} joined room: ${data}`);
     // aqui me cree unos datos como si fuera el redux para controlar el chat 
      let traveles = await Travel.findAll({where: {  carrierId:{[Op.not]: null}}})
     
       let Users = await User.findAll({where: {id:traveles[0].userId}})
       let Us = await User_Reg.findAll({where: {id:Users[0].idUserReg}})
    
  
     let Carriers = await Carrier.findAll({where: {id:traveles[0].carrierId}})
     
       let Car = await User_Reg.findAll({where: {id:Carriers[0].idUserReg}})
       let obj={travelId:traveles[0].id,Us,Car}
    /////////
  
      // por esta función callback podemos devolver información al front
       callback({
        status: obj
        });
  
    });
  
    // A traves de este socket se recibe y se envia la información
    socket.on("send_message", (data:any, callback:any) => {
      //esn esta variable tenemos cuantas personas hay en la sala,
      //que deberian ser 2 para que esten tanto el carrier como el User
      var sizeRoom = io.sockets.adapter.rooms.get(data.room)
   
      console.log(sizeRoom.size);
  
      socket.to(data.room).emit("receive_message", data);
      
      
      //si el numero de participantes es 1 devolvemos un mensaje de Offline user
      //que nos servira para validar los mensaje en el front.
      if(sizeRoom.size===1) var status='offline user'; else var status=''
      callback({
       status:status
       });
    }); 
        
   
  
  /////


    socket.on("message", async (data: any, callback: any) => {
        console.log(data)

        const { id, orig, destination, weight, price, description } = data


        /* const requestTravel = await Travel.findAll() */
        const requestTravel = await Travel.findAll({ where: { userId: id , carrierId:{[Op.eq]: null} }})
       
        /* console.log("ESTO ES REQUEST TRAVEL", requestTravel[0]?.carrierId ) */
        if( requestTravel.length === 0 || requestTravel[0]?.carrierId !== null) {
            
            let TravelId = uuid();
            var newViaje = {
                id: TravelId,
                orig,
                destination,
                weight,
                price,
                description,
                userId: id
            }
            let traveles = await Travel.create(newViaje)
            // console.log('traveles: ',traveles);
            socket.broadcast.emit('message', newViaje)
            let travel = await Travel.findAll()
            socket.broadcast.emit('Travel', travel)
    
            callback({
                status: TravelId
            });
        } else {
            console.log("ESTO ES,", requestTravel[0].id )
            callback({
                status: ["Ya tiene un viaje en proceso", requestTravel[0].id]
            })
        }


    })
    socket.on("response", async (data: any) => {
        console.log(data)
        const dateCarrier = await Carrier.findAll({where: { id: data.carrierId}})
        const userReg = await User_Reg.findAll({where: { id : dateCarrier[0].idUserReg}})
        const resp = {
            userReg: userReg[0],
            dateCarrier: dateCarrier[0]
        }
        
        let upTravel = await Travel.update({ carrierId: data.carrierId  } , { where: { userId: data.userId, carrierId: { [Op.eq]: null } } , returning: true });
        /* let upTravel2 = await Travel.update({ finishedTravel: "process" } , { where: { userId: data.userId, carrierId:  data.carrierId } }); */
        console.log("Esto es upTravel", upTravel )
     /*    const upTravel2 = await Travel.update({ finishedTravel: "process"} , { where: { userId: data.userId, finishedTravel: { [Op.eq]: null } } }); */
        socket.broadcast.emit('response', resp)
    })


    

    socket.on("delete", async (data: any , callback: any) => {
        console.log('Esto es lo que se debe borrar', data)
        const deltTravel = await Travel.destroy({ where: { id: data.id }});
      
    })
 


    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id)
    })
})













////end sokets

sequelize
    .sync({ force: false, logging: false })
    // .then(async () => {
    // 	// await resApiUsers()

    // })
    .then(() => {
        console.log('base de datos conectada! :D')
        server.listen(3001, function () {
            console.log('App is listening on port 3001!');
        });
    })
    .catch((err: error) => console.error(err));



