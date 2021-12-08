const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BookingSchema = new Schema(
  {
    code_bill: {
      type: String,
    },
    name: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      // required: true,
    },
    phone: {
      type: String,
      // required: true,
    },
    address: {
      type: String,
      // required: true,
    },
    repair_time: {
      type: Date,
      // required: true,
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    correction_time: {
      type: String,
      // required: true,
    },
    description_error: {
      type: String,
      // required: true,
    },
    status: {
      type: String,
      enum: [
        "Wait for confirmation",
        "Confirm",
        "Fixing",
        "Successful fix",
        "Cancellation of booking",
      ],
    },
    service_id: {
      type: mongoose.Types.ObjectId,
      ref: "Service",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", BookingSchema);
