import  {Router}  from "express";
import {registerUser , loginUser} from "../controllers/user/authController";
import { getUserprofile, updateUserProfile } from "../controllers/user/profileController";
import { authenticate } from "../middleware/authMiddleware";
import { deleteUser, listUsers } from "../controllers/admin/userController";
import { adminLogin } from "../controllers/admin/adminLogin";


const router = Router();

// User routes
//authenticate user
router.post("/register", registerUser);
router.post("/login", loginUser);

//user profile and edit
router.put('/profile' ,authenticate,updateUserProfile);

// Admin routes
router.post('/adminLogin',adminLogin);
router.get('/list-user',listUsers);
router.delete('/deleteUser',deleteUser)

export default router;
