const express = require("express");
const userController = require("../controllers/user");
const userValidation = require("../middleware/validation/user");
const { authenticate } = require("../middleware/auth");


const router = express.Router();



router.post("/signup",
             userValidation.validate("SIGNUP"),
             userController.signup
             );

router.post("/login",
             userValidation.validate("LOGIN"),
             userController.login 
             );


router.get("/",
            authenticate,
            userValidation.validate("GET"),
            userController.getAllUsers
            );             

router.get("/search",
            authenticate,
            userValidation.validate("GET"),
            userController.searchUser
            );
router.get("/:user_id",
            authenticate,
            userController.getUserProfile
            );
router.put("/:user_id",
            authenticate,
            userController.updateUserProfile
            );

module.exports = router;
