const express = require("express");
const messageController = require("../controllers/message");
const messageValidation = require("../middleware/validation/message");
const { authenticate } = require("../middleware/auth");

const router = express.Router();


router.route("/")
        .get(authenticate,messageController.getAllMessages)
        .post(authenticate,messageValidation.validate("CREATE"),messageController.postMessage);

router.route("/:message_id")
     .get(authenticate,messageValidation.validate("GET"), messageController.getMessage)
     .put(authenticate,messageValidation.validate("UPDATE"),messageController.updateMessage)
     .patch(authenticate,messageValidation.validate("UPDATE"),messageController.updateMessage)
     .delete(authenticate,messageValidation.validate("DELETE"),messageController.deleteMessage);


module.exports = router;
