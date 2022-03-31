// schema for projects 
const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    issue: [
      {
        type: mongoose.Schema.Types.ObjectId, //refers to the post schema
        ref: "Issue",
      },
    ],
  },
  {
    timestamps: true,
  }
);


// static method
const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
