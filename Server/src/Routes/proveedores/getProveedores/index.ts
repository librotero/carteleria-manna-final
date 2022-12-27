import {Router} from 'express';
import Proveedores from '../../../Models/proveedores'



const router = Router();

router.get('/', async(req, res, next)=>{
    try{
        const proveedores = await Proveedores.find() 
        res.status(200).json(proveedores)   
    } catch (error){
        next(error)
    }
})

export default router;