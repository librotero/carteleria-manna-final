import {Router} from 'express';
import Proveedores from '../../../Models/proveedores'



const router = Router();

router.put('/', async(req, res, next)=>{
    const {name, direccion,telefono, cuit, email, web, id} =req.body;
    try{
        await Proveedores.findByIdAndUpdate(id, {
            name, direccion,telefono, cuit, email, web
          });
          // Send response in here
          res.send('Item Updated!');    
          console.log("esto es un cambio",name, direccion,telefono, cuit, email, web )
    } catch (error){
        next(error)
    }
})

export default router;