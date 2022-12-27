import {Router} from 'express';
import Carteles from '../../../Models/carteles'


const router = Router();

router.delete('/:id', async(req, res, next)=>{
    const {id} =req.params;
     try{
        let deleteCarteles= await Carteles.findByIdAndDelete(id);
        res.status(200).json({message: 'Cartel deleted'});
        
    } catch (error){
        next(error)
    }
})

export default router;