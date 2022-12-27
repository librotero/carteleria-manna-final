import {Router} from 'express';
import Ordenes from '../../../Models/ordenes'
import moment from 'moment'

const router = Router();

router.get('/ordenesbydate', async(req, res, next)=>{
    const date1:any= req.query.date1
    const date2:any= req.query.date2

    console.log("holaaaaaaaaaaaaaaaaaaaaaaaaa", moment(date1).format("L"), moment(date2).format("L"))

    try{
        const ordenesOrigin = await Ordenes.find() 
        .populate('carteles')
        let busca: any = ordenesOrigin.filter(
            (n: any) =>
              moment(n.fecha).format("L") >= moment(date1).format("L") &&
              moment(n.fecha).format("L") <= moment(date2).format("L")
          );
          var ordenes: any = busca

        res.status(200).json(ordenes)   
    } catch (error){
        next(error)
    }
})

export default router;