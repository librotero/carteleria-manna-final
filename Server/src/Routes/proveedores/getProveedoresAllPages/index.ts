import {Router} from 'express';
import Role from '../../../Models/roles';
import Proveedores from '../../../Models/proveedores'


const router = Router();

router.get('/allproveedores', async(req: any, res: any, next)=>{
    
    try{
        const page : number = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 12;
        const name = req.query.name
        const proveedores = await Proveedores.find({name: { $regex: '.*' + name + '.*', $options: 'i' }}) 
            
            .skip(page*limit)
            .limit(limit)

        const total = await Proveedores.countDocuments({
           name: {$regex: name, $options: 'i'},
        });

        const response = {
            error: false,
            total,
            page: page + 1,
            totalPages: Math.ceil(total / limit),
            limit,
            proveedores,
        };
        res.status(200).json(response)   
    } catch (error){
        next(error)
    }
})

export default router;