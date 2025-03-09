import { Router } from "express";
import { addAnswer, addQuestion, getAnswers, getQuestions } from "../controllers/quizController";
import { isLogin } from "../utils/protectedRoutes";


const router = Router();

router.post('/add', addQuestion);
router.post('/addanswer', isLogin, addAnswer)
router.get('/:weapon',getQuestions)
router.get('/answers/:id',getAnswers)

export default router;