const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
    getProfileController,
    updateProfileController} = require("../controllers/userController");

router.get(
    "/profile",
    authMiddleware,
    getProfileController
);

router.put(
    "/profile",
    authMiddleware,
    updateProfileController
);



module.exports = router;