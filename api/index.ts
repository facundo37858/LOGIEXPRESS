import app from "./src/app";
import { Travel } from './src/models/Travel';
import { sequelize } from "./src/db";
import { uuid } from 'uuidv4';
import { callbackify } from "util";
import { Carrier } from "./src/models/Carrier";
import { User_Reg } from "./src/models/User_Reg";
const { Op } = require("sequelize");
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: "*" } });
interface error {
    err: string
}
///begin Sokets



io.on("connection", (socket: any) => {
    console.log("User conneted: " + socket.id)

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



