import Job from "../models/Job.js";
import JobApplication from "../models/jobApplication.js";
import User from "../models/User.js";
import { v2 as cloudinary } from "cloudinary";
import { getAuth } from "@clerk/express";

// Get User Data
export const getUserData = async (req, res) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.json({
        success: false,
        message: "Unauthorized",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    return res.json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// Apply for a Job
export const applyForJob = async (req, res) => {
  const { jobId } = req.body;

  const { userId } = getAuth(req);

  try {
    if (!userId) {
      return res.json({
        success: false,
        message: "Unauthorized",
      });
    }

    const isAlreadyApplied = await JobApplication.find({ jobId, userId });

    if (isAlreadyApplied.length > 0) {
      return res.json({
        success: false,
        message: "Already Applied",
      });
    }

    const jobData = await Job.findById(jobId);

    if (!jobData) {
      return res.json({
        success: false,
        message: "Job not Found!",
      });
    }

    await JobApplication.create({
      companyId: jobData.companyId,
      userId,
      jobId,
      date: Date.now(),
    });

    return res.json({
      success: true,
      message: "Applied Successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// Get User Applied Jobs
export const getUserJobApplication = async (req, res) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.json({
        success: false,
        message: "Unauthorized",
      });
    }

    const applications = await JobApplication.find({ userId })
      .populate("companyId", "name email image")
      .populate("jobId", "title description location category level salary")
      .exec();

    return res.json({
      success: true,
      applications,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// Update User Resume
export const updateUserResume = async (req, res) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.json({
        success: false,
        message: "Unauthorized",
      });
    }

    const resumeFile = req.file;

    const userData = await User.findById(userId);

    if (!userData) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    if (resumeFile) {
      const resumeUpload = await cloudinary.uploader.upload(resumeFile.path, {
        resource_type: "raw",
      });

      userData.resume = resumeUpload.secure_url;
    }

    await userData.save();

    return res.json({
      success: true,
      message: "Resume Updated",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};