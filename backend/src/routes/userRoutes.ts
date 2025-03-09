import { Router } from "express";
import { getAllUsers, getById, signIn, signUp } from "../controllers/authController";
import { isLogin } from "../utils/protectedRoutes";


const router = Router();

router.post('/signin', signIn);
router.post('/signup', signUp);
router.get('/all', getAllUsers);
router.get('/:id', getById);

export default router;