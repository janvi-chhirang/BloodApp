const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    inventoryType: {
      type: String,
      enum: ["in", "out"],
      required: true,
    },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Donar email is required"],
    },
    organisation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: function () {
        return this.inventoryType === "out";
      },
    },
    donar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
        required:function(){
           return this.inventoryType==="in"
      },
    },
  },
  { timestamps: true },
);

const InventoryModel = mongoose.model("Inventory", inventorySchema);

module.exports = InventoryModel;
