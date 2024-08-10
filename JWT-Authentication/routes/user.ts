import express from "express"
import handleLogin, { signup } from '../controllers/user.js'
const router=express.Router();
router.post('/signup',signup)
router.post('/login',handleLogin);

export default router