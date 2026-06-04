const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");
const { getDonarList , getHospitalList, getOrganisationList, deleteDonar, deleteHospital, deleteOrganisation } = require("../controller/admin.controller");

const router = express.Router();

//get donar list
router.get("/donar-list", authMiddleware,adminMiddleware, getDonarList);

//get hospital list
router.get("/hospital-list", authMiddleware,adminMiddleware, getHospitalList);

//get organization list
router.get("/org-list", authMiddleware,adminMiddleware, getOrganisationList);

//delete donar
router.delete("/delete-donar/:id", authMiddleware,adminMiddleware, deleteDonar);

//delete hospital
router.delete("/delete-hospital/:id", authMiddleware,adminMiddleware, deleteHospital);

//delete organization
router.delete("/delete-organisation/:id", authMiddleware,adminMiddleware, deleteOrganisation);

module.exports = router;