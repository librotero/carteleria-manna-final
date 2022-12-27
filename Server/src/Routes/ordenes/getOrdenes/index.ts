import {Router} from 'express';
import Ordenes from '../../../Models/ordenes'


const router = Router();

router.get('/', async(req, res, next)=>{
    try{
        const ordenes = await Ordenes.find() 
        .populate('carteles')
        res.status(200).json(ordenes)   
    } catch (error){
        next(error)
    }
})

export default router;