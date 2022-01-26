import { Response, Request, Router, NextFunction } from 'express';
import { Carrier } from '../models/Carrier';
import { Vehicle } from '../models/Vehicle';

const router = Router()

router.get("/vehicleDetails/:idRole", async (req: Request, res: Response, next: NextFunction) => {
    const { idRole } = req.params
    //console.log('soy idRole back', req.params)
    try {

        let userCarrier = await Carrier.findAll({ where: { id : idRole } })
        //console.log('soy lo que encuentra el idRole', userCarrier)
        let vehicleDetails = await Vehicle.findAll({ where: { CarrierId: userCarrier[0].id } })
       
        const payload = {
            brand: vehicleDetails[0].brand,
            patent: vehicleDetails[0].patent,
            model: vehicleDetails[0].model,
            color: vehicleDetails[0].color,
            capacity: vehicleDetails[0].capacity,
            carrier: vehicleDetails[0].carrier,
        }
        return res.json(payload)
    } catch (error) {
        console.log(error);
    }
})

export default router;	

