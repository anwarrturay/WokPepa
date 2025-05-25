const Resume = require("../models/Resume");
const asyncHandler = require('express-async-handler');

const getAllResumes = async (req, res) => {
    const resumes = await Resume.find();
    if (!resumes || resumes.length === 0) return res.status(204).json({ message: "No Available resumes found" });
    res.json(resumes);
}

const createNewResume = asyncHandler(async (req, res) => {
    const { personalDetails, experience, education, skills, summary, projects, certifications, languages, references, hobbies} = req.body;
    console.log("Fields Data: ", {
        personalDetails,
        experience,
        education,
        skills,
        summary,
        projects,
        certifications,
        languages,
        references,
        hobbies
    })

    const userId = req.params?.id
    if(!userId) return res.status(404).json({message: "User Id Not Found"});

    if ( !personalDetails || !experience || !education || !skills || !summary || !projects || !certifications || !languages || !references || !hobbies) {
        return res.status(400).json({ message: "All required fields must be provided" });
    }

    if (!req.file) {
        return res.status(400).json({ message: "No uploaded file" });
    }

    const parsedDob = new Date(personalDetails.dob);
    if (isNaN(parsedDob.getTime())) {
        return res.status(400).json({ message: "Invalid date format for DOB" });
    }

    const parsedExperience = JSON.parse(req.body.experience)
    const parsedEducation = JSON.parse(req.body.education)
    const parsedProjects = JSON.parse(req.body.projects)
    const parsedCertifications = JSON.parse(req.body.certifications)
    const parsedReferences = JSON.parse(req.body.references)
    // const parsedLanguages = JSON.parse(req.body.languages)
    // console.log(parsedLanguages);
    // const parsedHobbies = JSON.parse(req.body.hobbies)
    // const parsedSummary = JSON.parse(req.body.summary)
    // const parsedSkills = JSON.parse(req.body.skills)

    try {
        const newResume = new Resume({
            userId,
            personalDetails: {
                name: personalDetails.name,
                email: personalDetails.email,
                phone: personalDetails.phone,
                address: personalDetails.address,
                dob: parsedDob,
                country: personalDetails.country,
                nationality: personalDetails.nationality,
            },
            experience: parsedExperience.map(exp => ({
                jobTitle: exp.jobTitle,
                company: exp.company,
                startDate: exp.startDate,
                endDate: exp.endDate,
                responsibilities: exp.responsibilities || ""
            })),
            education: parsedEducation.map(edu => ({
                level: edu.level,
                school: edu.school,
                startDate: edu.startDate,
                endDate: edu.endDate,
                degree: edu.degree || ""
            })), 
            projects: parsedProjects.map(project => ({
                title: project.title,
                description: project.description,
                tools: project.tools || []
            })),
            certifications: parsedCertifications.map(cert => ({
                name: cert.name,
                issuingOrganization: cert.issuingOrganization,
                issueDate: cert.issueDate,
                expirationDate: cert.expirationDate || "" 
            })),
            languages: languages || [], 
            references: parsedReferences || [],
            hobbies: hobbies || [], 
            summary: summary || [],
            skills: skills || [],
            image: req.file.filename
        });

        const savedResume = await newResume.save();
        console.log("Resume Generated is: ", savedResume);
        const resumeUrl = `/resumes/${savedResume._id}.pdf`;

        return res.status(201).json({ message: "Resume created successfully", resumeUrl });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

const updateResume = async (req, res) => {
    const resumeId = req.body?.id;

    if (!resumeId) {
        return res.status(400).json({ message: "ID parameter is required" });
    }

    try {
        const resume = await Resume.findById(resumeId);
        if (!resume) {
            return res.status(404).json({ message: `No resume matches the ID: ${resumeId}` });
        }

        if (req.body.personalDetails) {
            resume.personalDetails = {
                ...resume.personalDetails,
                ...req.body.personalDetails
            };
        }

        if (req.body.summary) {
            resume.summary = req.body.summary;
        }

        if (Array.isArray(req.body.experience)) {
            resume.experience = req.body.experience;
        }

        if (Array.isArray(req.body.education)) {
            resume.education = req.body.education;
        }

        if (Array.isArray(req.body.skills)) {
            resume.skills = req.body.skills;
        }

        if (Array.isArray(req.body.projects)) {
            resume.projects = req.body.projects;
        }

        if (Array.isArray(req.body.certifications)) {
            resume.certifications = req.body.certifications;
        }

        if (Array.isArray(req.body.languages)) {
            resume.languages = req.body.languages;
        }

        if (Array.isArray(req.body.references)) {
            resume.references = req.body.references;
        }

        if (Array.isArray(req.body.hobbies)) {
            resume.hobbies = req.body.hobbies;
        }

        if (req.file) {
            resume.image = req.file.filename;
        }

        const updatedResume = await resume.save();

        return res.status(200).json({
            message: "Resume updated successfully",
            data: updatedResume
        });

    } catch (error) {
        console.error("Error updating resume:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const deleteResume = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ message: "Resume Id required" });

    const resume = await Resume.findById({ _id: req.params.id }).exec();
    if (!resume) return res.status(204).json({ message: "Resume not found" });

    const result = await resume.deleteOne({ _id: req.params.id }).exec();
    res.json(result);
}

const getSpecificResume = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ message: "Resume Id is required" });

    const { id } = req.params;

    const resume = await Resume.findById(id);
    if (!resume) return res.status(204).json({ message: "Resume not found" })

    res.status(200).json(resume);
}

module.exports = {
    getAllResumes,
    createNewResume,
    updateResume,
    deleteResume,
    getSpecificResume,
};
