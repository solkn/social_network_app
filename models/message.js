var mongoose = require("mongoose");

var messageSchema = new mongoose.Schema({
    msg:{
        type:String
    },
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
   
    createdOn:{
        type:Date,
        default:Date.now
    }


});

const Message = mongoose.model("Message",messageSchema);

module.exports = Message;
