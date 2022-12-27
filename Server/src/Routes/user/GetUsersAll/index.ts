import {Router} from 'express';
import Users from '../../../Models/user'


const router = Router();

router.get('/all', async(req, res, next)=>{
    try{
        const user= await Users.find() 
        .populate('roles')

        res.status(200).json(user)   
    } catch (error){
        next(error)
    }
})

export default router;