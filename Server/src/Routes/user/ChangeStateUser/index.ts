import {Router} from 'express';
import Role from '../../../Models/roles';
import User from '../../../Models/user'


const router = Router();

router.put('/state', async(req: any, res: any, next)=>{
    
    const {id, state}= req.body;
console.log("hola", id, state)
    await User.findByIdAndUpdate(id, {
        state
      });
      // Send response in here
      res.send('Item Updated!');
      console.log("hola", id, state)
 
})

export default router;