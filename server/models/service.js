const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ServiceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    parent_id: {
      type: mongoose.Types.ObjectId,
      ref: "Service",
    },
  },
  { timestamps: true } 
);

module.exports = mongoose.model("Service", ServiceSchema);
