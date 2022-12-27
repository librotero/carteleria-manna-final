import {Router} from 'express';
import Ordenes from '../../../Models/ordenes'


const router = Router();

router.put('/', async(req, res, next)=>{
    const {fecha, cliente, fechadeentrega, stateCarteleria, stateImpresiones, montototal,contacto,resta, restaHistory, carteles, operacion, lugardecolocacion, seña, formadepago, fechaentrega, facturanum,  observaciones, id} =req.body;
    console.log("hoy esto es un cambi despueso",resta, restaHistory, fecha, cliente, fechadeentrega,  montototal,  contacto, operacion, lugardecolocacion, seña, formadepago, fechaentrega, facturanum, observaciones, id )  
    try{
        await Ordenes.findByIdAndUpdate(id, {
            fecha, cliente, fechadeentrega,resta, stateCarteleria, stateImpresiones , restaHistory, montototal, contacto, carteles, operacion, lugardecolocacion,  seña, formadepago, fechaentrega, facturanum, observaciones 
          });
          // Send response in here
          res.send('Item Updated!');
          console.log("hoy esto es un cambi despueso",fecha, stateCarteleria, stateImpresiones , restaHistory, cliente, fechadeentrega,  montototal,  contacto,  operacion, lugardecolocacion,  seña, formadepago, fechaentrega, facturanum, observaciones, id )    
    } catch (error){
        next(error)
    }
})

export default router;