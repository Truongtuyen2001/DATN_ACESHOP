const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const quoteSchema =  new Schema(
    {
        name: {
            type: String,
            strim: true,
            required: true
        }
    },
    { timestamps: true },
)
module.exports = mongoose.model("Quote", quoteSchema)