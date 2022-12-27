import {Router} from 'express';
import User from '../../../Models/user'


const router = Router();

router.delete('/:id', async(req, res, next)=>{
    const {id} =req.params;
     try{
        let deleteUsers = await User.findByIdAndDelete(id);
        res.status(200).json({message: 'user deleted'});
        
    } catch (error){
        next(error)
    }
})

export default router;