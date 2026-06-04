const { request } = require("express");
const inventoryModel = require("../models/inventory.models");
const userModel = require("../models/user.model");
const mongoose = require("mongoose");

//create inventory
const createInventoryController = async (req, res) => {
  try {
    const { email, inventoryType, bloodGroup, quantity } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not registered",
      });
    }

    if (user.role === "donar" && inventoryType === "out") {
      return res.status(400).json({
        success: false,
        message: "Donors cannot request blood. Please contact the hospital first.",
      });
    }

    if (inventoryType === "out") {
      const requestedBloodGroup = bloodGroup;
      const requestedQuantityOfBlood = quantity;
      const organisation = new mongoose.Types.ObjectId(req.body.userId);

      const totalIn = await inventoryModel.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "in",
            bloodGroup: requestedBloodGroup,
          },
        },
        { $group: { _id: "$bloodGroup", total: { $sum: "$quantity" } } },
      ]);
      const totalInQty = totalIn[0]?.total || 0;

      const totalOut = await inventoryModel.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "out",
            bloodGroup: requestedBloodGroup,
          },
        },
        { $group: { _id: "$bloodGroup", total: { $sum: "$quantity" } } },
      ]);
      const totalOutQty = totalOut[0]?.total || 0;

      const availableQty = totalInQty - totalOutQty;

      if (availableQty < requestedQuantityOfBlood) {
        return res.status(500).send({
          success: false,
          message: `Stock Shortage! Only ${availableQty}ML available in Organisation.`,
        });
      }

      if (user.role === "hospital") {
        req.body.hospital = user._id;
      } else {
        req.body.donar = user._id;
      }
      req.body.email = user.email;
    } else {
      if (user.role === "hospital") {
        const hospitalId = user._id;
        const targetBloodGroup = bloodGroup;
        const donatingQuantity = quantity;

        const hospitalTotalInRecords = await inventoryModel.aggregate([
          {
            $match: {
              hospital: hospitalId,
              inventoryType: "out",
              bloodGroup: targetBloodGroup,
            },
          },
          { $group: { _id: "$bloodGroup", total: { $sum: "$quantity" } } },
        ]);
        const hospitalTotalIn = hospitalTotalInRecords[0]?.total || 0;

        const hospitalTotalOutRecords = await inventoryModel.aggregate([
          {
            $match: {
              hospital: hospitalId,
              inventoryType: "in",
              bloodGroup: targetBloodGroup,
            },
          },
          { $group: { _id: "$bloodGroup", total: { $sum: "$quantity" } } },
        ]);
        const hospitalTotalOut = hospitalTotalOutRecords[0]?.total || 0;

        const initialHospitalStock = 5;
        const currentHospitalAvailable =
          initialHospitalStock + hospitalTotalIn - hospitalTotalOut;

        if (currentHospitalAvailable < donatingQuantity) {
          return res.status(400).json({
            success: false,
            message: `Hospital Stock Shortage! You only have ${currentHospitalAvailable}ML of ${targetBloodGroup} (including 5ML initial reserve).`,
          });
        }

        req.body.hospital = user._id;
      } else {
        req.body.donar = user._id;
      }
      req.body.email = user.email;
    }

    const inventory = new inventoryModel(req.body);
    inventory.organisation = req.body.userId;
    await inventory.save();

    return res.status(201).json({
      success: true,
      message: "Blood Record Synced Successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in Inventory Processing",
      error: error.message,
    });
  }
};

// get inventory
const getInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find({ organisation: req.user.id })
      .populate("donar")
      .populate("hospital")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "All records fetched successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Error in Get Inventory", error });
  }
};

// get hospital blood consumer records
const getInventoryHospitalController = async (req, res) => {
  try {
    const inventory = await inventoryModel
      .find(req.body.filters)
      .populate("donar")
      .populate("hospital")
      .populate("organisation")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Hospital transaction history fetched",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Error in Consumer API", error });
  }
};

// get donar records
const getDonarsController = async (req, res) => {
  try {
    const organisation = new mongoose.Types.ObjectId(
      req.user?._id || req.user?.id,
    );
    const donarId = await inventoryModel.distinct("donar", { organisation });
    const donars = await userModel.find({ _id: { $in: donarId } });
    return res
      .status(200)
      .send({ success: true, message: "Donar records fetched", donars });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Error in Donar Records", error });
  }
};

// get hospital records
const getHospitalsController = async (req, res) => {
  try {
    const organisation = req.user?._id || req.user?.id;
    const hospitalId = await inventoryModel.distinct("hospital", {
      organisation,
    });
    const hospitals = await userModel.find({ _id: { $in: hospitalId } });
    return res
      .status(200)
      .send({ success: true, message: "Hospital records fetched", hospitals });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Error in Hospital API", error });
  }
};

// get organisation records
const getOrganisationController = async (req, res) => {
  try {
    const donar = req.user?._id || req.user?.id;
    const orgIds = await inventoryModel.distinct("organisation", { donar });
    const organisations = await userModel.find({
      _id: { $in: orgIds },
      role: "organisation",
    });
    return res
      .status(200)
      .send({ success: true, message: "Org Data fetched", organisations });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Error in Org API", error });
  }
};

// get organisation for hospitals
const getOrganisationForHospitalController = async (req, res) => {
  try {
    const hospital = req.user?._id || req.user?.id;
    const orgIds = await inventoryModel.distinct("organisation", { hospital });
    const organisations = await userModel.find({
      _id: { $in: orgIds },
      role: "organisation",
    });
    return res
      .status(200)
      .send({
        success: true,
        message: "Hospital Org Data fetched",
        organisations,
      });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Error in hospital-org API", error });
  }
};

// get recent 3 records
const getRecentInventoryController = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;
    const inventory = await inventoryModel
      .find({
        $or: [
          { organisation: userId },
          { hospital: userId },
          { donar: userId },
        ],
      })
      .limit(3)
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, inventory });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Error in Recent API", error });
  }
};

module.exports = {
  createInventoryController,
  getInventoryController,
  getDonarsController,
  getHospitalsController,
  getOrganisationController,
  getOrganisationForHospitalController,
  getInventoryHospitalController,
  getRecentInventoryController,
};
