import {Router} from 'express';
import Role from '../../../Models/roles';
import Ordenes from '../../../Models/ordenes'


const router = Router();

router.get('/all', async(req: any, res: any, next)=>{
    
    try{
        const page : number = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 12;

        const ordenes = await Ordenes.find() 
            
            .skip(page*limit)
            .limit(limit)

        const total = await Ordenes.countDocuments({
           // username: {$regex: search, $options: 'i'},
        });
console.log(total, ordenes)
        const response = {
            error: false,
            total,
            page: page + 1,
            totalPages: Math.ceil(total / limit),
            limit,
            ordenes,
        };
        res.status(200).json(response)   
    } catch (error){
        next(error)
    }
})

export default router;