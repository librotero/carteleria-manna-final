import {Router} from 'express';
import Role from '../../../Models/roles';
import Insumo from '../../../Models/insumo'


const router = Router();

router.get('/allinsumos', async(req: any, res: any, next)=>{
    
    try{
        const page : number = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 12;
        const name = req.query.name
        const insumos = await Insumo.find({ name: { $regex: '.*' + name + '.*', $options: 'i' }})
      
            
            .skip(page*limit)
            .limit(limit)

        const total = await Insumo.countDocuments({
           name: {$regex: name, $options: 'i'},
        });

        const response = {
            error: false,
            total,
            page: page + 1,
            totalPages: Math.ceil(total / limit),
            limit,
            insumos,
        };
        console.log("hola soy un total", insumos)
        res.status(200).json(response)   
    } catch (error){
        next(error)
    }
})

export default router;