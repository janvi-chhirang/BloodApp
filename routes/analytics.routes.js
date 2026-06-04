const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const { getBloodGroupDetails } = require("../controller/analytics.controller");

const router = express.Router();

router.get("/bloodGroups-data", authMiddleware, getBloodGroupDetails);

module.exports = router;