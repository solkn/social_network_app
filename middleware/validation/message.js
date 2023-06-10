const { body, param } = require("express-validator");
const mongoose = require("mongoose");

/**
 *
 * @param {String} type
 * GET | CREATE | UPDATE | DELETE
 */
exports.validate = (type) => {
  switch (type) {
    case "GET":
      return [
        param("id")
          .custom((value) => {
            return mongoose.Types.ObjectId.isValid(value);
          })
          .withMessage("Invalid message ID"),
      ];
    case "CREATE":
      return [
        body("msg").not().isEmpty()
        .withMessage("message  is required"),
        body("msgFrom").not().isEmpty()
        .withMessage("the message sender is required"),
        body("msgTo").not().isEmpty()
        .withMessage("the message receiver is required"),
         
      ];
    case "UPDATE":
      return [
        param("id")
          .custom((value) => {
            return mongoose.Types.ObjectId.isValid(value);
          })
          .withMessage("Invalid message ID"),
          body("msg").optional().not().isEmpty()
          .withMessage("Message is required"),
          body("msgFrom").optional().not().isEmpty()
          .withMessage("Message sender is required"),
          body("msgTo").optional().not().isEmpty()
          .withMessage("Message receiver is required"),
        
      ];
    case "DELETE":
      return [
        param("id")
          .custom((value) => {
            return mongoose.Types.ObjectId.isValid(value);
          })
          .withMessage("Invalid message ID"),
      ];

    default:
      return [];
  }
};