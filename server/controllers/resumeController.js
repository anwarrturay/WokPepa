const Resume = require("../models/Resume");
const PDFDocument = require("pdfkit");
const asyncHandler = require('express-async-handler');
const fs = require('fs');
const path = require('path');

const getAllResumes = async (req, res) => {
    const resumes = await Resume.find();
    if (!resumes || resumes.length === 0) return res.status(204).json({ message: "No Available resumes found" });
    res.json(resumes);
}

const createNewResume = asyncHandler(async (req, res) => {
    const { userId, title, personalDetails, experience, education, skills } = req.body;

    if (!userId || !title || !personalDetails || !experience || !education || !skills) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Validate file upload
    if (!req.file) {
        return res.status(400).json({ message: "No uploaded file" });
    }

    // Validate Date of Birth
    const parsedDob = new Date(personalDetails.dob);
    if (isNaN(parsedDob.getTime())) {
        return res.status(400).json({ message: "Invalid date format for DOB" });
    }

    try {
        // Create a new Resume document
        const newResume = new Resume({
            userId,
            title,
            personalDetails: {
                name: personalDetails.name,
                email: personalDetails.email,
                phone: personalDetails.phone,
                address: personalDetails.address,
                dob: parsedDob,
                country: personalDetails.country
            },
            experience: experience.map(exp => ({
                jobTitle: exp.jobTitle,
                company: exp.company,
                startDate: exp.startDate,
                endDate: exp.endDate
            })),
            education: education.map(edu => ({
                level: edu.level,
                school: edu.school,
                startDate: edu.startDate,
                endDate: edu.endDate
            })),
            skills,
            image: { data: req.file.buffer, contentType: req.file.mimetype }
        });

        const savedResume = await newResume.save();

        // Ensure the directory exists before saving the file
        const resumeDir = path.join(__dirname, "../public/resumes");
        if (!fs.existsSync(resumeDir)) {
            fs.mkdirSync(resumeDir, { recursive: true }); // Create the directory if it doesn't exist
        }

        const pdfPath = path.join(resumeDir, `${savedResume._id}.pdf`);
        await generatePDF(savedResume, pdfPath);

        const resumeUrl = `/resumes/${savedResume._id}.pdf`;

        res.status(201).json({ message: "Resume created successfully", resumeUrl });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

const updateResume = async (req, res) => {
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
                ...(resume.experience || []),
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
                ...(resume.education || []),
                ...req.body.education.map((edu) => ({
                    level: edu.level ?? null,
                    school: edu.school ?? null,
                    startDate: edu.startDate ?? null,
                    endDate: edu.endDate ?? null,
                })),
            ];
        }

        // Update skills
        if (Array.isArray(req.body.skills)) {
            resume.skills = [
                ...(resume.skills || []),
                ...req.body.skills.map((skill) => skill ?? null),
            ];
        }

        if (req.file) {
            resume.image = req.file.buffer;
        }

        const updatedResume = await resume.save();
        res.status(200).json({ message: "Updated Resume successfully", data: updatedResume });
    } catch (error) {
        console.error("Error updating resume:", error);
        res.status(500).json({ message: "Internal server error" });
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

    const resume = await Resume.findById({ _id: req.params.id }).exec();
    if (!resume) return res.status(204).json({ message: "Resume not found" })

    res.json(resume);
}

const generatePDF = async (resume, filePath) => {
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    // 🔹 Resume Title
    doc.fontSize(24).font("Helvetica-Bold").text(`Resume: ${resume.title}`, { align: "center" });
    doc.moveDown();

    // 🔹 Personal Details
    doc.fontSize(16).text("Personal Details", { underline: true });
    doc.fontSize(12)
        .text(`Name: ${resume.personalDetails.name}`)
        .text(`Email: ${resume.personalDetails.email}`)
        .text(`Phone: ${resume.personalDetails.phone}`)
        .text(`Address: ${resume.personalDetails.address}`)
        .text(`DOB: ${new Date(resume.personalDetails.dob).toLocaleDateString()}`)
        .text(`Country: ${resume.personalDetails.country}`)
        .moveDown();

    // 🔹 Experience
    if (resume.experience.length > 0) {
        doc.fontSize(16).text("Experience", { underline: true }).moveDown();
        resume.experience.forEach((exp) => {
            doc.fontSize(14).text(`• ${exp.jobTitle} at ${exp.company}`, { continued: true });
            doc.fontSize(12).text(` (${exp.startDate} - ${exp.endDate})`).moveDown();
        });
        doc.moveDown();
    }

    // 🔹 Education
    if (resume.education.length > 0) {
        doc.fontSize(16).text("Education", { underline: true }).moveDown();
        resume.education.forEach((edu) => {
            doc.fontSize(14).text(`• ${edu.level} - ${edu.school}`, { continued: true });
            doc.fontSize(12).text(` (${edu.startDate} - ${edu.endDate})`).moveDown();
        });
        doc.moveDown();
    }

    // 🔹 Skills
    if (resume.skills.length > 0) {
        doc.fontSize(16).text("Skills", { underline: true }).moveDown();
        doc.fontSize(12).text(resume.skills.join(", "));
        doc.moveDown();
    }

    doc.end();

    return new Promise((resolve, reject) => {
        stream.on("finish", resolve);
        stream.on("error", reject);
    });
};

const generateResumePDF = async (req, res) => {
    const resumeId = req.params.id;
    if (!resumeId)
        return res.status(400).json({ message: "Resume ID is required" });

    try {
        const resume = await Resume.findById(resumeId).exec();
        if (!resume)
            return res.status(404).json({ message: "Resume not found" });

        // Create a new PDF document.
        const doc = new PDFDocument();
        let buffers = [];
        doc.on("data", buffers.push.bind(buffers));
        doc.on("end", () => {
            const pdfData = Buffer.concat(buffers);
            res.writeHead(200, {
                "Content-Type": "application/pdf",
                "Content-Disposition": 'attachment; filename="resume.pdf"',
                "Content-Length": pdfData.length,
            });
            res.end(pdfData);
        });

        // Build the PDF content.
        doc.fontSize(24).text(`Resume: ${resume.title}`, { align: "center" });
        doc.moveDown();
        doc.fontSize(16).text("Personal Details", { underline: true });
        doc.fontSize(12)
            .text(`Name: ${resume.personalDetails.name}`)
            .text(`Email: ${resume.personalDetails.email}`)
            .text(`Phone: ${resume.personalDetails.phone}`)
            .text(`Address: ${resume.personalDetails.address}`)
            .text(`DOB: ${new Date(resume.personalDetails.dob).toLocaleDateString()}`)
            .text(`Country: ${resume.personalDetails.country}`)
            .moveDown();

        // Add experience, education, and skills like earlier...

        doc.end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error generating PDF" });
    }
};

module.exports = {
    getAllResumes,
    createNewResume,
    updateResume,
    deleteResume,
    getSpecificResume,
    generatePDF,
    generateResumePDF
};
