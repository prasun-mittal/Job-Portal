import express from 'express'
import { changeJobApplicationStatus, changeVisibility, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from '../controllers/companyController.js'

const router = express.Router()

// Register a company
router.post('/register',registerCompany)

// Company login
router.post('/login',loginCompany)

// Get Company Data
router.get('/company',getCompanyData)

// Post a job
router.post('/post-job',postJob)

// Get Applicants data of company
router.get('/applicants',getCompanyJobApplicants)

// Get Company job list
router.get('/list-jobs',getCompanyPostedJobs)

// Change Application Status
router.post('/change-status',changeJobApplicationStatus)

// Change Application visibility
router.post('/change-visibility',changeVisibility)

export default router