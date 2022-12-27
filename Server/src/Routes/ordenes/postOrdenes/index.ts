import {Router} from 'express';
import Ordenes from '../../../Models/ordenes'
import User from '../../../Models/user'



const router = Router();

router.post('/create', async(req, res, next)=>{
    const {idUser, fecha, cliente, fechaentrega, resta, restaHistory,  montototal, vendedor, contacto, stateImpresiones, carteles, stateCarteleria, operacion, lugardecolocacion,  seña, formadepago, facturanum, observaciones} =req.body;
    console.log("hkikakakaka", stateImpresiones, stateCarteleria)
    try{
        const ordenesNew:any = new Ordenes({fecha, cliente, resta, restaHistory, contacto, vendedor, stateImpresiones, stateCarteleria, carteles, operacion, lugardecolocacion, seña, formadepago, fechaentrega, facturanum, observaciones, montototal})
        await ordenesNew.save()
        const user:any = await User.findById(idUser)

       if(user){
        user.ordenes.push(ordenesNew);
        await user.save(ordenesNew);
        console.log("hola soy un user", ordenesNew._id, user)
       }
        res.status(201).json('insumo adherido correctamente')
    } catch (error){
        next(error)
    }
})

export default router;