const mongoose = require("mongoose");
const { Schema } = mongoose;

const ResumeSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    personalDetails: {
      name: { type: String, required: true, trim: true },
      email: { type: String, required: true, trim: true },
      phone: { type: Number, required: true, trim: true },
      address: { type: String, required: true, trim: true },
      dob: {
        type: Date,
        required: true,
        validate: {
          validator: function (value) {
            return value instanceof Date && !isNaN(value);
          },
          message: "Invalid date format",
        },
      },
      country: { type: String, required: true, trim: true },
      linkedin: { type: String, trim: true },
      github: { type: String, trim: true },
      twitter: { type: String, trim: true },
    },
    summary: {
      type: String,
      trim: true,
    },
    experience: [
      {
        jobTitle: { type: String, required: true, trim: true },
        company: { type: String, required: true, trim: true },
        startDate: { type: String, required: true },
        endDate: { type: String },
        responsibilities: { type: String, trim: true },
      },
    ],
    education: [
      {
        level: { type: String, required: true, trim: true },
        school: { type: String, required: true, trim: true },
        startDate: { type: String, required: true },
        endDate: { type: String, required: true },
        degree: { type: String, trim: true },
      },
    ],
    skills: [{ type: String, trim: true }],
    projects: [
      {
        name: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        technologies: [{ type: String, trim: true }],
      },
    ],
    certifications: [
      {
        name: { type: String, required: true, trim: true },
        issuingOrganization: { type: String, required: true, trim: true },
        issueDate: { type: String, required: true },
        expirationDate: { type: String, trim: true },
      },
    ],
    languages: [{ type: String, trim: true }],
    awards: [{ type: String, trim: true }],
    references: [
      {
        name: { type: String, required: true, trim: true },
        position: { type: String, required: true, trim: true },
        contact: { type: String, required: true, trim: true },
      },
    ],
    hobbies: [{ type: String, trim: true }],
    image: {
      type: String,
      required: true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resume", ResumeSchema);
