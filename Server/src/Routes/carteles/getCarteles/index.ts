import {Router} from 'express';
import Carteles from '../../../Models/carteles'


const router = Router();

router.get('/', async(req, res, next)=>{
    try{
        const carteles = await Carteles.find() 
        res.status(200).json(carteles)   
    } catch (error){
        next(error)
    }
})

export default router;