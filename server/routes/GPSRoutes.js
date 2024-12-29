import express from 'express';
const router = express.Router();
import checkUserAuth from '../middlewares/auth-middleware.js';
import AdminController from '../controllers/AdminController.js';


    
//addEmployee and Update Employee routes
 
router.get('/get-all-gps',checkUserAuth,AdminController.getAllGPS)
router.get('/get-user-logs/:userid',checkUserAuth,AdminController.eachUserLogs)
router.put('/save-gps',checkUserAuth,AdminController.saveGPS)

 
export default router;