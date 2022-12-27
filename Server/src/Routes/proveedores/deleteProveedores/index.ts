import {Router} from 'express';
import Proveedores from '../../../Models/proveedores'


const router = Router();

router.delete('/:id', async(req, res, next)=>{
    const {id} =req.params;
     try{
        let deleteProveedores = await Proveedores.findByIdAndDelete(id);
        res.status(200).json({message: 'insumo deleted'});
        
    } catch (error){
        next(error)
    }
})

export default router;