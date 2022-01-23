import { Response, Request, Router, NextFunction, response } from 'express';
const { Op } = require("sequelize");
import { uuid } from 'uuidv4';

import { Travel } from '../models/Travel';
import { User } from '../models/User';
import { User_Reg } from '../models/User_Reg';
import { Carrier } from '../models/Carrier';
import { Vehicle } from '../models/Vehicle';
import { ServiceAlert } from '../models/ServiceAlert';

const router = Router()
router.get('/allan', async (req: Request, res: Response) => {
  res.send('Allan Torres');
});


function getDistanciaMetros(origen: string, destino: string) {
  var newOrigen = origen.split("/")
  var newDestino = destino.split("/")
  var lat1 = newOrigen[0];
  var lon1 = newOrigen[1];
  var lat2 = newDestino[0];
  var lon2 = newDestino[1];
  var rad = function (x: number) { return x * Math.PI / 180; }
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
    const { origen, destino, weight } = req.body
    // var destino= "-26.8082848,-65.2175903"
    // var origen= "-24.7821269,-65.4231976"
    // let weight= 20;
    let distance = getDistanciaMetros(origen, destino);
    const valor = 10; /// valor de tonelada por km recorrido
    let price = Math.round(valor * (weight * distance))

    res.send({ price });
  } catch (error) {
    console.log("Error", error)
  }

});


router.post('/requestTravel', async (req: Request, res: Response, next: NextFunction) => {

  const { id, orig, destination, weight, price, description } = req.body

  try {
    let TravelId = uuid()
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

    /* let vehicles = await Vehicle.findAll({
      where: {
        capacity: { [Op.or]: { [Op.eq]: weight, [Op.gt]: weight } }
      }
    })
    let obj = [];
    let tam = vehicles.length;
    for (let i = 0; i < tam; i++) {
      obj[i] =
      { TravelId: TravelId, CarrierId: vehicles[1].CarrierId }
    }
    let alertServices = await ServiceAlert.bulkCreate(obj); */
    /*   res.send(newViaje) */
    res.send({ id: TravelId })

  } catch (err) {
    next(err)
  }

});

router.post('/oneTravel', async (req: Request, res: Response, next: NextFunction) => {

  const { id } = req.body
  let getTravel = await Travel.findAll({ where: { id: id } })
  let varUser = await User.findAll({ where: { id: getTravel[0].userId } })
  let varUserReg = await User_Reg.findOne({ where: { id: varUser[0].idUserReg } });
  const travelFullData = { travel: getTravel[0], user: varUser[0], userReg: varUserReg }
  if (getTravel.length === 0){
    return res.send('Travel not found');
  } 
  else {
    return res.send(travelFullData);}
    /* res.send({varUser}) */
});





router.get('/Travel', async (req: Request, res: Response, next: NextFunction) => {



  try {
    //Importante en el modelo de travel hay un error en declaración de la relacion con user User_Reg
    //hay que corregir que es de tipo string 
    let travel = await Travel.findAll()
    // res.send(travel);
    if (travel.length > 0) {
      let tam = travel.length;
      var travelFullData = [];
      for (let i = 0; i < tam; i++) {

        let varUser = await User.findAll({ where: { id: travel[i].userId } })
        let varUserReg = await User_Reg.findOne({ where: { id: varUser[0].idUserReg } });
        travelFullData[i] = { travel: travel[i], user: varUser[0], userReg: varUserReg }
      }
      return res.send(travelFullData)
    }
    //res.send('data not found')
    //por consola me aparece:"Executing (default): SELECT "id", "ducumentoIdentidad", "eMail", "ubicacion", "cel", "tel", "fotoPerfil", "medioPago", "name", "lastName", "paswword", "terminosCondiciones", "createdAt", "updatedAt" FROM "Users" AS "User";"
    //no pude corregirlo!!
  }
  catch (err) {
    next(err)
  }
});

router.post('/requestAlert', async (req: Request, res: Response, next: NextFunction) => {

  const { id } = req.body


  try {

    let alert = await ServiceAlert.findAll({ where: { CarrierId: id } })
    let tamAlert = alert.length;
    let notification: boolean;

    if (tamAlert > 0) { notification = true }
    else { notification = false }
    res.send({ notification });

  } catch (err) {
    next(err)
  }

});
router.post('/waitTravel', async (req: Request, res: Response, next: NextFunction) => {

  const { id } = req.body
  let getTravel = await Travel.findAll({ where: { userId: id, carrierId: { [Op.eq]: null }, finishedTravel: { [Op.is]: null } } })
  if (getTravel.length === 0) res.send({ data: 0 });
  else res.send(getTravel);

});
router.put('/acceptTravel', async (req: Request, res: Response, next: NextFunction) => {
  //id=es el Id de travel que viene desde el front
  const { userId, carrierId, id } = req.body



  const upTravel = await Travel.update({ carrierId: carrierId }, { where: { id: id } });
  if (upTravel[0] === 1) {
    let getUser = await User.findAll({ where: { id: userId } })
    let getUserReg = await User_Reg.findAll({ where: { id: getUser[0].idUserReg } })

    let dataFull = {
      User: getUser,
      User_Reg: getUserReg
    }

    res.send(dataFull);
  }
  else res.send('id travel incorrecto');

});


export default router;