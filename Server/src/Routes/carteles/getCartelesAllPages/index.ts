import {Router} from 'express';
import Role from '../../../Models/roles';
import Carteles from '../../../Models/carteles'


const router = Router();

router.get('/allcarteles', async(req: any, res: any, next)=>{
    
    try{
        const page : number = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 12;
        const name = req.query.name
        const carteles = await Carteles.find({ descripcion: { $regex: '.*' + name + '.*', $options: 'i' }}) 
            
            .skip(page*limit)
            .limit(limit)

        const total = await Carteles.countDocuments({
           descripcion: {$regex: name, $options: 'i'},
        });

        const response = {
            error: false,
            total,
            page: page + 1,
            totalPages: Math.ceil(total / limit),
            limit,
            carteles,
        };
        console.log("hola soy un total", total)
        res.status(200).json(response)   
    } catch (error){
        next(error)
    }
})

export default router;