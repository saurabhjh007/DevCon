const User = require("../models/User");

const getProfileController = async (req, res) => {
    const userId = req.user.userId;

    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    const profile = {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
        bio: user.bio,
        skills: user.skills,
        linkedin: user.linkedin,
        github: user.github
    };

    return res.status(200).json({
        profile
    });
};

const updateProfileController = async (req, res) => {
    const {
        name,
        bio,
        skills,
        profilePicture,
        linkedin,
        github
    } = req.body;

    if(skills !== undefined && !Array.isArray(skills)){
        return res.status(400).json({
            message : "skills must be in an array"
        })
    }

    if (
    skills !== undefined &&
    !skills.every(skill => typeof skill === "string")
) {
    return res.status(400).json({
        message: "Each skill must be a string"
    });
}

    if (name !== undefined && name.trim() === "") {
    return res.status(400).json({
        message: "Name cannot be empty"
    });
}   
    if (
    profilePicture !== undefined &&
    typeof profilePicture !== "string"
) {
    return res.status(400).json({
        message: "Profile picture must be a URL"
    });
}

    const userId = req.user.userId;

    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    if(name !== undefined) user.name = name.trim();
    if(bio !== undefined) user.bio = bio;
    if(skills !== undefined) user.skills = skills;
    if(profilePicture !== undefined) user.profilePicture = profilePicture;
    if(linkedin !== undefined) user.linkedin = linkedin;
    if(github !== undefined) user.github = github;

    await user.save();

    return res.status(200).json({
    message: "Profile updated successfully",
    profile: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
        bio: user.bio,
        skills: user.skills,
        linkedin: user.linkedin,
        github: user.github
    }
});

};

module.exports = {
    getProfileController, updateProfileController
};