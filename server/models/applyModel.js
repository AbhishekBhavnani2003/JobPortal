const mongoose = require("mongoose");
const { Schema } = mongoose;

const applySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address:
    {
        type: String,
        required: true
    },
    contactno:
    {
        type: String,
        required: true
    },
    location:
    {
        type: String,
        required: true
    },
    gender:
    {
        type: String,
        required: true
    },
    age:
    {
        type: Number,
        required: true
    },
    category:
    {
        type: String,
        required: true

    }
});

module.exports = mongoose.model('Application', applySchema);