import {Router} from 'express';
import User, { IUser } from '../../../Models/user';


const router = Router();

router.post('/dato', async(req, res, next)=>{
    const {name, lastname, dni, fechaNacimiento, direccion, id, state, ordenes} =req.body;
          console.log("holaaaaaa", id)

    try{
        await User.findByIdAndUpdate(id, {
            name, lastname, dni, fechaNacimiento, state, direccion, ordenes
          });
          // Send response in here
          res.send('Item Updated!');    
          console.log("holaaaaaa", ordenes)
    } catch (error){
        next(error)
    }
})

export default router;