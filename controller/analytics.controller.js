const mongoose = require("mongoose");
const InventoryModel = require("../models/inventory.models");

const getBloodGroupDetails = async (req, res) => {
  try {
    const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
    const organisation = new mongoose.Types.ObjectId(req.user?._id || req.user?.id || req.body?.userId);

    const bloodGroupData = await Promise.all(bloodGroups.map(async (bloodGroup) => {
      // Total IN
      const totalIn = await InventoryModel.aggregate([
        {
          $match: {
              inventoryType: "in",
              bloodGroup,
              organisation: new mongoose.Types.ObjectId(organisation),
            },
          },
          {
            $group: { _id: null, totalQuantity: { $sum: "$quantity" } },
          },
        ]);

        // Total OUT
        const totalOut = await InventoryModel.aggregate([
          {
            $match: {
              inventoryType: "out",
              bloodGroup,
              organisation: new mongoose.Types.ObjectId(organisation),
            },
          },
          {
            $group: { _id: null, totalQuantity: { $sum: "$quantity" } },
          },
        ]);

        const inQty = totalIn[0]?.totalQuantity || 0;
        const outQty = totalOut[0]?.totalQuantity || 0;

        return {
          bloodGroup,
          totalIn: inQty,
          totalOut: outQty,
          availableQuantity: inQty - outQty,
        };
      })
    );

    return res.status(200).send({
      success: true,
      message: "Blood Group Analytics Data Fetched Successfully",
      data: bloodGroupData,
    });
    
  } catch (error) {
    console.error("Controller Error:", error);
    return res.status(500).send({
      success: false,
      message: "Error in BloodGroup data Analytics API",
      error: error.message,
    });
  }
};

module.exports = { getBloodGroupDetails };