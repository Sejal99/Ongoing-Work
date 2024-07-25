import express from 'express'
import {create}from '../controllers/user.js'
// import {sendEmail} from '../controllers/user.js'
const router=express.Router();
router.post('/create',create);

// router.post('/sendEmail',sendEmail);

export default router;