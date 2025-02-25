const mongoose = require("mongoose");
const { Schema } = mongoose

const ResumeSchema = new Schema(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    title: { 
      type: String, 
      required: true, 
      trim: true 
    },
    personalDetails: {
      name: { type: String, required: true, trim: true },
      email: { type: String, required: true, trim: true },
      phone: { type: Number, required: true, trim: true },
    },
    experience: [
      {
        jobTitle: { type: String, required: true, trim: true },
        company: { type: String, required: true, trim: true },
        startDate: { type: String, required: true },
        endDate: { type: String }
      },
    ],
    education: [
      {
        degree: { type: String, required: true, trim: true },
        school: { type: String, required: true, trim: true },
        year: { type: String, required: true }, 
      },
    ],
    skills: [{ type: String, trim: true }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resume", ResumeSchema);
