const express = require("express");
const {
  create,
  updateBookingStatusAdmin,
  getBookingStatusUser,
  getListBookingUser,
  listBooking,
  detailBooking,
  listAllBookingStatus,
  searchBookingUser,
  Validate,
  userValidationResult,
  checkMail,
  checkPhone
} = require("../controllers/booking.js");
const { verifyToken, isAdmin, } = require("../middleware/auth.js");
const router = express.Router();

// api admin
router.get("/booking", listBooking);
router.get("/booking/detail/:id", detailBooking);
router.put(
  "/booking/updateStatus/:bookingId",
  verifyToken,
  isAdmin,
  updateBookingStatusAdmin
);
router.post("/booking/status", listAllBookingStatus);

// api user
router.post("/booking", create);
router.get("/booking/user", verifyToken, getListBookingUser);
router.post("/booking/user/status", verifyToken, getBookingStatusUser);
router.post("/booking/user/search", verifyToken, searchBookingUser);

module.exports = router;
