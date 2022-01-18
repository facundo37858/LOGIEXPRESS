import { Socket } from "socket.io";
import { io } from "../app";

// io.on("connection", function (socket) {
//     console.log("Un cliente se ha conectado",socket.id);
 
// });

 export const connection=(socket:Socket)=>{
    console.log("Un cliente se ha conectado",socket.id)
}