const express = require("express");
const { verifyToken, authorizeRoles } = require("../middleware/authMiddleware");
const {
  createOrder,
  verifyPayment,
} = require("../controllers/paymentController");

const router = express.Router();

router.post("/order", verifyToken, authorizeRoles("student"), createOrder); // ✅ Only students can create orders
router.post("/verify", verifyToken, authorizeRoles("student"), verifyPayment); // ✅ Only students can verify payments

module.exports = router;
