import {Router} from 'express';
import Clientes from '../../../Models/clientes'


const router = Router();

router.get('/', async(req, res, next)=>{
    try{
        const clientes = await Clientes.find() 
        res.status(200).json(clientes)   
    } catch (error){
        next(error)
    }
})

export default router;