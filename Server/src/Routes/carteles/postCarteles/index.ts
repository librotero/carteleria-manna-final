import {Router} from 'express';
import Carteles from '../../../Models/carteles'


const router = Router();

router.post('/create', async(req, res, next)=>{
    const {descripcion, costo1faz, costo2faz, insumosArray, category, total} =req.body;
    try{
        const carteles = new Carteles({descripcion, costo1faz, category, costo2faz, total, insumosArray})
        await carteles.save()
        res.status(201).json('cartel adherido correctamente')
    } catch (error){
        next(error)
    }
})

export default router;