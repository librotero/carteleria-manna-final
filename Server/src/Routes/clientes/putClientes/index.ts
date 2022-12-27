import {Router} from 'express';
import Clientes from '../../../Models/clientes'


const router = Router();

router.put('/', async(req, res, next)=>{
    const {name, telefono, cuit, direccion, email, condicioniva, razonsocial, id} =req.body;
    try{
        await Clientes.findByIdAndUpdate(id, {
            name, telefono, cuit, direccion, email, condicioniva, razonsocial
          });
          // Send response in here
          res.send('Item Updated!');    
    } catch (error){
        next(error)
    }
})

export default router;