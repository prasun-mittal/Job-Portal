import express from 'express'
import { applyForJob, getUserData, getUserJobApplication, updateUserResume } from '../controllers/userController.js'
import upload from '../config/multer.js'


const router = express.Router()

// Get User Data
router.get('/user',getUserData)

// Apply for a Job
router.post('/apply',applyForJob)

// Get applied job data
router.get('/applications',getUserJobApplication)

// update user profile
router.post('/update-resume',upload.single('resume'),updateUserResume)

export default router