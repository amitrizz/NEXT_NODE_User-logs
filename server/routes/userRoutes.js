import express from 'express';
const router = express.Router();
import UserContoller from '../controllers/UserController.js';
import checkUserAuth from '../middlewares/auth-middleware.js';


//public routes
router.post('/register', UserContoller.userResgistration);//when we insert value use post method
router.post('/login', UserContoller.userLogin);//when we insert value use post method

  
//private routes
router.post('/change-password',checkUserAuth, UserContoller.changePassword);
router.get('/logged-user',checkUserAuth,UserContoller.loggedUser);


export default router;