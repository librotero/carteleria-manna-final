import {Router} from 'express';
import Role from '../../../Models/roles';
import Presupuestos from '../../../Models/presupuesto'


const router = Router();

router.get('/allpresupuestos', async(req: any, res: any, next)=>{
    
    try{
        const page : number = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 12;
        const name = req.query.name

        const presupuestos = await Presupuestos.find({ clientes: { $regex: '.*' + name + '.*', $options: 'i' }}) 
            
            .skip(page*limit)
            .limit(limit)

        const total = await Presupuestos.countDocuments({
           clientes: {$regex: name, $options: 'i'},
        });

        const response = {
            error: false,
            total,
            page: page + 1,
            totalPages: Math.ceil(total / limit),
            limit,
            presupuestos,
        };
        res.status(200).json(response)   
    } catch (error){
        next(error)
    }
})

export default router;