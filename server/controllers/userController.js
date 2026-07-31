import Job from "../models/job.js"
import JobApplication from "../models/jobApplication.js"
import User from "../models/User.js"


// Get User data
export const getUserData = async(req,res) => {

    const userId =req.auth.userId

    try {
        
        const user = await User.findById(userId)

        if (!user) {
            return res.json({success:false,message: ' User not found'})
        }
        res.json({success:true,user})

    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

// apply for a job
export const applyForJob = async (req,res) => {
    
    const {jobId} = req.body
    
    const userId = req.auth.userId

    try {
        
        const isAlreadyApplied = await JobApplication.find({jobId,userId})
        if (isAlreadyApplied.length>0) {
            return res.json({success:false,message:'Already Appied'})
        }

        const jobData = await Job.findById(jobId)

        if (!jobData) {
            return res.json({success:false,message:"Job not Found!"})
        }

        await JobApplication.create({
            companyId: jobData.companyId,
            userId,
            jobId,
            date:Date.now(),
        })
        return res.json({success:true,message:'Applied Successfully'})

    } catch (error) {
        res.json({success:false,message:error.message})
    }

}

// Get user applied applications
export const getUserJobApplication = async (req,res) => {
    
}

// update User profile (resume)
export const updateUserResume = async (req,res) => {
    
}