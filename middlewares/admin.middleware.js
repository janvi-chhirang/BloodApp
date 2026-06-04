const userModel = require("../models/user.model");

module.exports = async (req, res, next) => {
  try {
    const userId =  req.user?.id;

    if (!userId) {
      console.log("Current req.user content:", req.user);
      
      return res.status(401).send({
        success: false,
        message: "Unauthorized access. User ID not found in request payload.",
      });
    }

    const user = await userModel.findById(userId);
    
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found in database.",
      });
    }

    if (user.role !== "admin") {
      return res.status(401).send({
        success: false,
        message: "Unauthorized access. Admins only.",
      });
    }

    next();
  } catch (error) {
    console.error("Admin middleware error:", error);
    res.status(401).send({
      success: false,
      message: "Unauthorized access. Admins only.",
      error: error.message,
    });
  }
};