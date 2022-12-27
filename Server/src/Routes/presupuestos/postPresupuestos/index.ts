import {Router} from 'express';
import Presupuestos from '../../../Models/presupuesto'


const router = Router();

router.post('/create', async(req, res, next)=>{
    const {fecha, clientes,  carteles, operacion,vendedor, lugardecolocacion, contacto, montototal, formadepago, plazodeentrega, fechavalida, observaciones} =req.body;
    console.log("hola si me llega", clientes)
    try{
        const presupuestos = new Presupuestos({fecha,vendedor, clientes,carteles, contacto, operacion, lugardecolocacion,  montototal, formadepago, plazodeentrega, fechavalida, observaciones})
        await presupuestos.save()
        res.status(201).json('Presupuestos adherido correctamente')
    } catch (error){
        next(error)
    }
})

export default router;