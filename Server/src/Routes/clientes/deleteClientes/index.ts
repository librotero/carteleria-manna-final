import {Router} from 'express';
import Clientes from '../../../Models/clientes'


const router = Router();

router.delete('/:id', async(req, res, next)=>{
    const {id} =req.params;
     try{
        let deleteClientes = await Clientes.findByIdAndDelete(id);
        res.status(200).json({message: 'insumo deleted'});
        
    } catch (error){
        next(error)
    }
})

export default router;