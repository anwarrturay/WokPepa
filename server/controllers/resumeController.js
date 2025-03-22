const Resume = require("../models/Resume");
const upload = require("../middleware/multerConfig");

const getAllResumes = async (req, res)=>{
    const resumes = await Resume.find();
    if(!resumes) return res.status(204).json({ message: "No Available resumes found"});
    res.json(resumes);
}

// creating a new resume.
const createNewResume = async (req, res)=>{
    const { userId, title, personalDetails, experience, education, skills } = req.body;

    // Validate all the required fields.
    if(!userId || !title || !personalDetails || !experience || !education || !skills){
        return res.status(400).json({message: "All the fields are required"})
    }

    // Validate the personal details
    if (!personalDetails.name || !personalDetails.email || !personalDetails.phone || !personalDetails.address || !personalDetails.dob || !personalDetails.country) {
        return res.status(400).json({ message: "Personal details are incomplete" });
    }

    // validate the experience
    if (!Array.isArray(experience) || experience.length === 0) {
        return res.status(400).json({ message: "Experience details are required" });
    }

    // validate the education
    if (!Array.isArray(education) || education.length === 0) {
        return res.status(400).json({ message: "Education details are required" });
    }
    // validate skills
    if (!Array.isArray(skills) || skills.length === 0) {
        return res.status(400).json({ message: "Skills are required" });
    }

    if(!req.file){
        return res.status(400).json({message: "No uploaded file"});
    }

    const fileBuffer = req.file.buffer;
    console.log(fileBuffer);

    const parsedDob = new Date(req.body.personalDetails.dob);
    if (isNaN(parsedDob)) {
        return res.status(400).json({ message: "Invalid date format for dob" });
    }

    try{
        const newResume = new Resume({
            userId,
            title: req.body.title,
            personalDetails:{
                name: req.body.personalDetails.name,
                email: req.body.personalDetails.email,
                phone: req.body.personalDetails.phone,
                address: req.body.personalDetails.address,
                dob: parsedDob,
                country: req.body.personalDetails.country
            },
            experience: req.body.experience.map(exp=>({
                jobTitle: exp.jobTitle,
                company: exp.company,
                startDate: exp.startDate,
                endDate: exp.endDate
            })),
            education: req.body.education.map(edu => ({
                level: edu.level,
                school: edu.school,
                year: edu.year
            })),
            skills,
            image: { data: fileBuffer, contentType: req.file.mimetype }
        })
        const result = await newResume.save();
        console.log(result);
        res.status(201).json({message: "Resume created Successfully", data: result})
    }catch(err){
        console.error(err)
        res.status(500).json({message: "Internal server error"})
    }
}

const updateResume = async (req, res) => {
    // Validate ID
    if (!req?.body?.id) {
        return res.status(400).json({ message: "ID parameter is required" });
    }

    try {
        // Find the resume to update
        const resume = await Resume.findById({ _id: req.body.id }).exec();
        if (!resume) {
            return res.status(204).json({ message: `No resume matches the ID: ${req.body.id}` });
        }

        // Update fields if they exist in the request body
        if (req.body.title) {
            resume.title = req.body.title;
        }

        // Update personalDetails
        if (req.body.personalDetails) {
            resume.personalDetails = {
                ...resume.personalDetails,
                name: req.body.personalDetails.name ?? resume.personalDetails.name,
                email: req.body.personalDetails.email ?? resume.personalDetails.email,
                phone: req.body.personalDetails.phone ?? resume.personalDetails.phone,
                address: req.body.personalDetails.address ?? resume.personalDetails.address,
                dob: req.body.personalDetails.dob ?? resume.personalDetails.dob,
                country: req.body.personalDetails.country ?? resume.personalDetails.country
            };
        }

        // Update experience
        if (Array.isArray(req.body.experience)) {
            resume.experience = [
                ...(resume.experience || []), // Ensure experience is an array
                ...req.body.experience.map((exp) => ({
                    jobTitle: exp.jobTitle ?? null,
                    company: exp.company ?? null,
                    startDate: exp.startDate ?? null,
                    endDate: exp.endDate ?? null,
                })),
            ];
        }

        // Update education
        if (Array.isArray(req.body.education)) {
            resume.education = [
                ...(resume.education || []), // Ensure education is an array
                ...req.body.education.map((edu) => ({
                    level: edu.level ?? null,
                    school: edu.school ?? null,
                    year: edu.year ?? null,
                })),
            ];
        }

        // Update skills
        if (Array.isArray(req.body.skills)) {
            resume.skills = [
                ...(resume.skills || []), // Ensure skills is an array
                ...req.body.skills.map((skill) => skill ?? null),
            ];
        }

        if (req.file) {
            resume.image = req.file.buffer; // Save image path in DB
        }

        // Save the updated resume to the database
        const updatedResume = await resume.save();
        res.status(200).json({message: "Updated Resume successfully", data:updatedResume});
    } catch (error) {
        console.error("Error updating resume:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const deleteResume = async (req, res)=>{
    if(req?.body?.id) return res.status(400).json({message: "resume Id required"});

    const resume = await Resume.findById({_id:req.body.id}).exec();
    if(!resume) return res.status(204).json({message: "resume not found"});

    const result = await resume.deleteOne({_id:req.body.id}).exec();
    res.json(result);

}

const getSpecificResume = async (req, res)=>{
   if(!req?.params?.id) return res.status(400).json({message: "Resume Id is required"});

   const resume = await Resume.findById({_id:req.body.id}).exec();
   if(!resume) return res.status(204).json({message: "Resume not found"})

    res.json(resume);
}

module.exports = {
    getAllResumes,
    createNewResume,
    updateResume,
    deleteResume,
    getSpecificResume
}