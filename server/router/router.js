var express= require('express');
var router=express.Router();
var app = express();
var users = require('../controller/controller.js');
var auth = require('../router/authRouter.js');

const { check, validationResult } = require('express-validator/check');

var usermod = require('../model/users.js');
// var validator=require('express-validator');
// var db = new usermod();
var response = {};  

router.use('/auth', auth);
router.post("/login", users.login);


router.post('/register',
[
    check('fname').isLength({ min:3 }).isAlpha(),
    check('lname').isLength({ min:1 }).isAlpha(),
    check('loginId').isLength({min:3}),
    check('phonenumber').isMobilePhone("en-IN"),
    check('email').isEmail(),
    check('password').isLength({min:5})
  ], (req, res) => {
    console.log("backend"+req.body);
    
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

var db = new usermod();
db.fname = req.body.fname;
db.lname = req.body.lname;
db.loginId = req.body.loginId;
db.phonenumber = req.body.phonenumber;

db.email = req.body.email;
// Hash the password using SHA1 algorithm.
db.password = require('crypto')
    .createHash('sha1')
    .update(req.body.password)
    .digest('base64');
    console.log(req.body);
    usermod.find({ "email": db.email}, function (err, data) {
        if (data.length > 0) {
            response = {
                "error": false,
                "message": "email id already exists",
            }
            return res.status(404).send(response);
        }
        if (err) {
            response = {
                "error": true,
                "message": "error occured"
            }
            return res.status(404).send(response);
        }
        else {
            console.log(db.email+""+db.firstname+""+db.lastname);
            db.save(function (err) {
                if (err) {
                    response = {
                        "error": true,
                        "message": " error storing data "
                    }
                }
                else {

                    response = { 
                        "error": false, 
                        "message": "Registration Successful"
                    
                    }
                }
               return res.status(202).send(response);
            });
        }
    });
});
app.use('/', router);



module.exports=router;