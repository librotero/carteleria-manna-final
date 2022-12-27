import {Router} from 'express';
import Insumo from '../../../Models/insumo'


const router = Router();

router.put('/', async(req, res, next)=>{
    const {name, descripcion, unidad, costo, categoria, proveedor, id} =req.body;
    try{
        await Insumo.findByIdAndUpdate(id, {
            name, descripcion, unidad, costo, categoria, proveedor
          });
          // Send response in here
          res.send('Item Updated!');    
    } catch (error){
        next(error)
    }
})

export default router;