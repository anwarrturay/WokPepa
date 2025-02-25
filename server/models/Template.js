const mongoose = require("mongoose");

const TemplateSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true, 
      unique: true, 
      trim: true 
    },
    previewImage: { 
      type: String, 
      required: true, 
      trim: true 
    }, // URL for the template preview image
  },
  { timestamps: true }
);

module.exports = mongoose.model("Template", TemplateSchema);
