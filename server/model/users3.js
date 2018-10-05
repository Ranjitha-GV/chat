var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/userbd',{useNewUrlParser:true});
var mongoSchema=mongoose.Schema;
var singleMessageSchema=new mongoSchema({
    'message' :{
        type:String,
        required:true
    },
    'senderId' :{
        type:String,
        required:false
    },
    'receiverId' :{
        type:String,
        required:true
    },

    'senderName' :{
        type:String,
        required:true
    },
    'receiverName' :{
        type:String,
        required:true
    },
    'date' :{
        type:Date,
        required:true
    }
    
});
module.exports=mongoose.model('peermessages',singleMessageSchema);