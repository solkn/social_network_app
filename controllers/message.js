const Message = require("../models/message");
const { valdidationResult } = require("express-validator");


/** 
  *@param {Object}req
  *@param {Object}res
  *@param {Function}next
*/



exports.getAllMessages = async (req, res, next) => {
  try {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   res.status(400).json({
    //     status: "error",
    //     message: errors.array()[0].msg,
    //   });
    // }
    const data = await Message.find().populate("msgFrom").exec();
  // .exec(function (err, sender) {
  //   if (err) return handleError(err);
  //  // console.log('The sender is %s', sender.users.user_id);
  // });
    if (!data) {
      res.status(404).json({
        status: "error",
        message: "messages do not exist",
      });
    }
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    //TODO
  }
};




/** 
  *@param {Object}req
  *@param {Object}res
  *@param {Function}next
*/


// exports.getMessage = async(req,res,next) =>{
//    await Message.findById(req.params.message_id,function (err,message) {
//         if(err){
//             res.send(err);
//         }
//         res.json({
//             data:message,
//         });
//     });
    
// }



 exports.getMessage = async (req, res, next) => {
  try {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   res.status(400).json({
    //     status: "error",
    //     message: errors.array()[0].msg,
    //   });
    // }
    const data = await Message.findById(req.params.message_id).populate("sender").exec();
    if (!data) {
      res.status(404).json({
        status: "error",
        message: "message with this ID does not exist",
      });
    }
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    //TODO
  }
};


/** 
  *@param {Object}req
  *@param {Object}res
  *@param {Function}next
*/


//  exports.postMessage =  async(req,res,next)=>{
//     var chat = new Message();
//     chat.msg = req.body.msg;
//     chat.msgFrom = req.body.msgFrom;
//     chat.msgTo = req.body.msgTo;

//     await chat.save(function(err){
         
//          if(err){
//              res.send(err);
//          }
//          res.json({
//              message:"chat is created",
//              data:chat
//          });
//     });
// }

exports.postMessage = async (req, res, next) => {
    try {
    //   const errors = validationResult(req);
    //   if (!errors.isEmpty()) {
    //     res.status(400).json({
    //       status: "error",
    //       message: errors.array()[0].msg,
    //     });
    //   }
      const data = await Message.create({
        ...req.body,
        msg: req.body.msg,
        sender: req.user._id
      });
      res.status(201).json({
        status: "success",
        data,
      });
    } catch (err) {
      //TODO
    }
  }




/** 
  *@param {Object}req
  *@param {Object}res
  *@param {Function}next
*/

exports.updateMessage = async(req,res,next) =>{
    await Message.findById(req.params.message_id,function(err,chat){
        if(err){
            res.send(chat);
        }
        chat.msg = chat.body.msg;
        chat.sender = chat.body.sender;
        chat.receiver = chat.body.receiver;

        chat.save(function(err) {
            if(err){
                res.send(err);
            }
            res.json({
                message:"chat is updated successfully!",
                data:chat,
            });
            
        });
    });
    
}


/** 
  *@param {Object}req
  *@param {Object}res
  *@param {Function}next
*/


exports.deleteMessage = async(req,res,next) =>{
    await message.findByIdAndRemove(req.params.message_id,function(err,chat){

        if(err){
            res.send(err);
        }
        res.json({
            status:"success",
            message:"chat is deleted succefully",
        });

    });
    
}
