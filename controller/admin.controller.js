const userModel = require("../models/user.model");

//get donar list
const getDonarList = async (req, res) => {
  try {
    const donarData = await userModel
      .find({ role: "donar" })
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      total: donarData.length,
      message: "Donar list fetched successfully",
      data: donarData,
    });
  } catch (error) {
    console.error("Error fetching donar list:", error);
    res.status(500).send({
      success: false,
      message: "Error in donar list API",
      error: error.message,
    });
  }
};

//get hospital list
const getHospitalList = async (req, res) => {
  try {
    const hospitalData = await userModel
      .find({ role: "hospital" })
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      total: hospitalData.length,
      message: "Hospital list fetched successfully",
      data: hospitalData,
    });
  } catch (error) {
    console.error("Error fetching hospital list:", error);
    res.status(500).send({
      success: false,
      message: "Error in hospital list API",
      error: error.message,
    });
  }
};

//get organization list
const getOrganisationList = async (req, res) => {
  try {
    const organisationData = await userModel
      .find({ role: "organisation" })
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      total: organisationData.length,
      message: "Organisation list fetched successfully",
      data: organisationData,
    });
  } catch (error) {
    console.error("Error fetching organisation list:", error);
    res.status(500).send({
      success: false,
      message: "Error in organisation list API",
      error: error.message,
    });
  }
};

//delete donar
const deleteDonar = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "Donar deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting donar:", error);
    res.status(500).send({
      success: false,
      message: "Error in delete donar API",
      error: error.message,
    });
  }
};

//delete hospital
const deleteHospital = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "Hospital deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting hospital:", error);
    res.status(500).send({
      success: false,
      message: "Error in delete hospital API",
      error: error.message,
    });
  }
};

//delete organization
const deleteOrganisation = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "Organisation deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting organisation:", error);
    res.status(500).send({
      success: false,
      message: "Error in delete organisation API",
      error: error.message,
    });
  }
};

module.exports = {
  getDonarList,
  getHospitalList,
  getOrganisationList,
  deleteDonar,
  deleteHospital,
  deleteOrganisation,
};
