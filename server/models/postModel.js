const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
    category: {
        type: String,
        required: true
    },
    title:
    {
        type: String,
        required: true
    },
    description:
    {
        type: String,
        required: true
    },
    experience:
    {
        type: Number,
        required: true
    },
    gender:
    {
        type: String,
        required: true
    },
    agegroup:
    {
        from:
        {
            type: Number,
            required: true
        },
        to:
        {
            type: Number,
            required: true
        },
    },
    audition:
    {
        venue:
        {
            type: String,
            required: true
        },
        date:
        {
            type: Date,
            required: true
        },
        time:
        {
            type: String,
            required: true   
        }
    },
    createdby:
    {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Post', postSchema);