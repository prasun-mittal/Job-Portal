import Company from "../models/company.js"
import bcrypt from "bcrypt"
import {v2 as cloudnary} from 'cloudinary'
import generateToken from "../utils/generateToken.js"
import Job from "../models/job.js"

// Register a new Company
export const registerCompany = async (req,res)=>{

    const {name,email,password} = req.body

    const imageFile = req.file;

    if (!name || !email || !password || !imageFile) {
        return res.json({success:false, message:"missing Details"})
    }
    
    try {

        const companyExist = await Company.findOne({email})

        if (companyExist) {
            return res.json({success:false,message:"Company Already Registered"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt)

        const imageUpload = await cloudnary.uploader.upload(imageFile.path)
        
        const company = await Company.create({
            name,
            email,
            password: hashPassword,
            image: imageUpload.secure_url
        })

        res.json({

            success:true,
            company:{
                _id:company._id,
                name:company.name,
                email:company.email,
                image:company.image
            },
            token: generateToken(company._id)
        })

    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }

}

// Company login
export const loginCompany = async (req,res) => {
    const {email,password} = req.body

    try {
        
        const company = await Company.findOne({email})

        if (bcrypt.compare(password,company.password)) {
            
            res.json({
                success:true,
                company:{
                    _id:company._id,
                    name:company.name,
                    email:company.email,
                    image:company.image
                },
                token: generateToken(company._id)
            })
        }
        else{
            res.json({success:false,message:'Invalid email or password'})
        }

    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }
}

// Get Company Data
export const getCompanyData = async (req,res) => {
    
}

// Post a new Job
export const postJob = async (req,res) => {
    
    const {title,description,location,salary,level,category} = req.body

    const companyId = req.company._id

    try {
        
        const newJob = new Job({
            title,
            description,
            location,
            salary,
            companyId,
            date: Date.now(),
            level,
            category
        })

        await newJob.save()

        res.json({success:true, newJob})

    } catch (error) {
        res.json({success:false, message:error.message})
    }
    
}

// Get Company Job Applicants
export const getCompanyJobApplicants = async (req,res) => {
    
}

// Get Company Posted Jobs
export const getCompanyPostedJobs = async (req,res) => {
    
}

// Change Job Application Status
export const changeJobApplicationStatus = async (req,res) => {
    
}

// Change Job Visibility
export const changeVisibility = async (req,res) => {
    
}