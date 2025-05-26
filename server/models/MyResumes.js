const mongoose = require("mongoose");
const { Schema } = mongoose;

const MyResumesSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    savedResumes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume"
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("MyResumes", MyResumesSchema);
