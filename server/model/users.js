var mongoose    =   require("mongoose");
mongoose.connect('mongodb://localhost:27017/userbd',{ useNewUrlParser: true });
// create instance of Schema
var mongoSchema =  mongoose.Schema;
// create schema
var userSchema  = new mongoSchema({
            'fname'  : {
                        type : String, 
                        required: false
                    },
            'lname':  {
                        type: String, 
                        required: false
                    },
            'loginId':  {
                        type: String, 
                        required: true
                    },
            'phonenumber': {
                        type: String, 
                        required: false
                    },
            'email':  {
                        type: String, 
                        required: true
                    },
            'password':   {
                            type: String, 
                            required: true
                        }
});

module.exports = mongoose.model('userLogin',userSchema);