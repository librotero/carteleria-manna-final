import {Router} from 'express';
import Ordenes from '../../../Models/ordenes'
import User from '../../../Models/user'


const router = Router();

router.delete('/:id', async(req, res, next)=>{
    const {id} =req.params;
    const idUser:any= req.query.idUser
     try{
        let deleteOrdenes = await Ordenes.findByIdAndDelete(id);
        res.status(200).json({message: 'insumo deleted'});
        const user:any = await User.findById(idUser)

       if(user){
       var deleteOrden = await  user.ordenes.filter((e:any)=>e!==id)
       user.ordenes=deleteOrden
       console.log("hola so una orden user", user)

       }
    } catch (error){
        next(error)
    }
})

export default router;