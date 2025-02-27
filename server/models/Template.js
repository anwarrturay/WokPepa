const mongoose = require('mongoose');
const { Schema } = mongoose;

const ResumeTemplateSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    personalDetails: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String }
    },
    experience: [
        {
            company: { type: String, required: true },
            role: { type: String, required: true },
            duration: { type: String, required: true },
            description: { type: String, required: true }
        }
    ],
    education: [
        {
            school: { type: String, required: true },
            degree: { type: String, required: true },
            year: { type: String, required: true }
        }
    ],
    skills: [{ type: String, required: true }],
    image: { type: String }, // URL for profile picture
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ResumeTemplate', ResumeTemplateSchema);
