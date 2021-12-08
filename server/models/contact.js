const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const contentSchema = new Schema(
    {
        userName :{
            type :String,
            strim :true,
            maxLength : 32,
            required : true
        },
        phone :{
            type: Number
        },
        address: {
            type: String,
            maxLength: 300,
            required: true
        },
        email: {
            type: String,
            maxLength: 100,
            required: true
        },
        contact: {
            type: String,
            maxLength: 3000,
            required: true
        }
    },
    {timestamps : true}, 
)

module.exports = mongoose.model("Contact", contentSchema )
