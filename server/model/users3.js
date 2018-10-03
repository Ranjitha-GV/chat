var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/userbd', { useNewUrlParser: true });
var Schema = mongoose.Schema;
var messageSchema=new Schema({
    message:{type:String,required:true},
    senderId:{type:String,required:true},
    receiverId:{type:String,required:true},
    date:{type:Date,default:Date.now},
    senderName:{type:String,required:true},
    receiverName:{type:String,required:true}
})
module.exports = mongoose.model('chat', messageSchema);