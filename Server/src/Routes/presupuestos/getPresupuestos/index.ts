import {Router} from 'express';
import Presupuestos from '../../../Models/presupuesto'


const router = Router();

router.get('/', async(req, res, next)=>{
    try{
        const presupuestos = await Presupuestos.find() 
        .populate('carteles')
        .populate('clientes')

        res.status(200).json(presupuestos)   
    } catch (error){
        next(error)
    }
})

export default router;