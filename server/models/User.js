const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        username: {
            type: String,
            required: true,
            unique: true
        },

        email: {
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
            required: true
        },

        profilePicture: {
            type: String,
            default: ""
        },

        bio: {
            type: String,
            default: ""
        },

        skills: {
            type: [String],
            default: []
        },

        linkedin: {
            type: String,
            default: ""
        },

        github: {
            type: String,
            default: ""
        }
    },
    {
        timestamps : true
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;