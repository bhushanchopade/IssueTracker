const Project = require("../models/project");
const Issue = require("../models/issue");

// home controller for all project list showing on home page of issue tracker
module.exports.home = async function (req, res) {
  try {
    // CHANGE :: populate the likes of each post and comment
    let projects = await Project.find({});
    return res.render("home", {
      title: "Issue_Tracker | Home",
      projects: projects,
    });
  } catch (err) {
    console.log("Error", err);
    return;
  }
};
