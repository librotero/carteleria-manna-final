import {Router} from 'express';
import Presupuestos from '../../../Models/presupuesto'


const router = Router();

router.delete('/:id', async(req, res, next)=>{
    const {id} =req.params;
     try{
        let deletepresupuestos = await Presupuestos.findByIdAndDelete(id);
        res.status(200).json({message: 'presupuesto deleted'});
        
    } catch (error){
        next(error)
    }
})

export default router;