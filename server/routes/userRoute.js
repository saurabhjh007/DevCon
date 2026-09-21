const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

router.get("/profile", authMiddleware, (req, res) => {

    res.json({
        message: "Profile route accessed successfully",
        userId: req.user.userId
    });

});

module.exports = router;