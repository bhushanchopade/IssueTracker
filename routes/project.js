const express = require("express");
const router = express.Router();

const projectController = require("../controllers/project_controller");
// routing 
router.get("/create_project", projectController.createproject);
router.post("/create", projectController.create);
router.get("/project/:id", projectController.project);
router.get("/create_issue/:id", projectController.createIssue);
router.post("/project_issue", projectController.projectIssue);
module.exports = router;
