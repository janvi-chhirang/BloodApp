const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const {
  createInventoryController,
  getDonarsController,
  getHospitalsController,
  getOrganisationController,
  getOrganisationForHospitalController,
  getInventoryHospitalController,
  getRecentInventoryController,
} = require("../controller/Inventory.controller");
const {
  getInventoryController,
} = require("../controller/Inventory.controller");

const router = express.Router();

//add inventory
router.post("/create-Inventory", authMiddleware, createInventoryController);

//get all blood records in inventory
router.get("/get-Inventory", authMiddleware, getInventoryController);

//get all recent blood records in inventory
router.get("/get-recent-Inventory", authMiddleware, getRecentInventoryController);

//get hospital blood records in inventory
router.post("/get-Inventory-hospital", authMiddleware, getInventoryHospitalController);

//get donars records
router.get("/get-donars", authMiddleware, getDonarsController);

//get hospitals records
router.get("/get-hospitals", authMiddleware, getHospitalsController);

//get organisation records
router.get("/get-organisation", authMiddleware, getOrganisationController);

//get organisation records for hospital
router.get(
  "/get-organisation-for-hospitals",
  authMiddleware,
  getOrganisationForHospitalController,
);

module.exports = router;
