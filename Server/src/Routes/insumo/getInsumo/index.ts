import {Router} from 'express';
import Insumo from '../../../Models/insumo'


const router = Router();

router.get('/', async(req, res, next)=>{
    try{
        const insumos = await Insumo.find() 
        res.status(200).json(insumos)   
    } catch (error){
        next(error)
    }
})

export default router;