import {Router} from 'express';
import User from '../../../Models/user'

const router = Router();

router.get('/profile', async(req:any, res:any, next:any)=>{

  try {
    const user:any = await User.findById(req.userId, { password: 0 }).populate('roles');
    return res.status(200).json(user);
  } catch (error) {
    return res.status(401).json({ message: "User not found" });
  }
})

export default router;