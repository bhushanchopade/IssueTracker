const Project = require("../models/project");
const Issue = require("../models/issue");


// rendering create project page
module.exports.createproject = function (req, res) {
  return res.render("create_project", {
    title: "IssueTraker | create_project",
  });
};

// creating project in database
module.exports.create = function (req, res) {
  let project = Project.create(
    {
      name: req.body.name,
      description: req.body.description,
      author: req.body.author,
    },
    function (err, project) {
      if (err) {
        req.flash("error", "Please check!");
        return;
      }
    }
  );
  req.flash("success", "Project created!");
  return res.redirect("back");
};

// project details controller
module.exports.project = function (req, res) {
  Project.findById(req.params.id)
    .populate("issue")
    .exec(function (err, project) {
      // do something.
      // variable `person` contains the final populated data
      if (err) {
        console.log(err);
        return;
      }
      return res.render("project", {
        title: "IssueTraker | Projects",
        project: project,
      });
    });
};

// rendering createIssue page with passing id for creating issue on reffered project
module.exports.createIssue = function (req, res) {
  Project.findById(req.params.id)
    .populate("issue")
    .exec(function (err, project) {
      if (err) {
        return;
      }
      // console.log(project);
      return res.render("create_issue", {
        title: "IssueTraker | create_issue",
        project: project,
      });
    });
};

// for create issue report on any project
module.exports.projectIssue = async function (req, res) {
  try {
    let project = await Project.findById(req.body.project);

    if (project) {
      let issue = await Issue.create({
        title: req.body.title,
        description: req.body.description,
        lables: req.body.lables,
        author: req.body.author,
        project: req.body.project,
      });

      project.issue.push(issue);
      project.save();

      req.flash("success", "Issue report created!");
      res.redirect("back");
    }
  } catch (err) {
    req.flash("error", err);
    return;
  }
};
