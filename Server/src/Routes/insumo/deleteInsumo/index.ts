import {Router} from 'express';
import Insumo from '../../../Models/insumo'


const router = Router();

router.delete('/:id', async(req, res, next)=>{
    const {id} =req.params;
     try{
        let deleteInsumo = await Insumo.findByIdAndDelete(id);
        res.status(200).json({message: 'insumo deleted'});
        
    } catch (error){
        next(error)
    }
})

export default router;