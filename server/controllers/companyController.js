
// Register a new Company
export const registerCompany = async (req,res)=>{

    const {name,email,password} = req.body

    console.log("body= ",req.body);
    return res.json(req.body);
    

}

// Company login
export const loginCompany = async (req,res) => {
    
}

// Get Company Data
export const getCompanyData = async (req,res) => {
    
}

// Post a new Job
export const postJob = async (req,res) => {
    
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