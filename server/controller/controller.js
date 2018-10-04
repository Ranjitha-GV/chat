function encryption(password) {
    var pass= require('crypto')
         .createHash('sha1')
         .update(password)
         .digest('base64');
         return pass;
 }
//  const { check, validationResult } = require('express-validator/check');
var jwt = require('jsonwebtoken');
var config = require('../config/auth.js');

 exports.login=function(req,res)
 {
    // req.checkBody(loginId,"Please enter alphabets").isLength()
    // req.checkBody(password,"Please enter alphabets").isLength();
    var userModel = require('../model/users.js');
     console.log("called");
    var response={};
    var db = new userModel();
    var userModel = require('../model/users.js');
    userModel.find({ "loginId": req.body.loginId, "password": encryption(req.body.password) }, function (err, data) {
        if(err){
            console.log(res);
            response={
                "Success":false,
                "meassage":"error fetching data"
            }
            return res.status(404).send(response);
        }else{
            if (data.length > 0) {

                // create a token
                var token = jwt.sign({ id: db._id }, config.secret, {
                    expiresIn: 86400 // expires in 24 hours
                   });
                response = {
                    "Success": true,
                    "message": "login succesfull",
                    "token": token,
                    "userid":data[0]._id,
                    "username":data[0].loginId
                }
                return res.status(200).send(response);
            }
            else {
                response = {
                    "error": false,
                    "message": "Invalid credentials"
                }
                return res.status(404).send(response);
            }
        }
       
    })

 }
 
 exports.registration = function (req, res) {
    var userModel = require('../model/users.js')
    var db = new userModel();
     var response = {};
     db.firstname = req.body.firstname;
     db.lastname = req.body.lastname;
     db.username = req.body.username;
     db.email = req.body.email;
     db.phonenumber = req.body.phonenumber;
     db.password = encryption(req.body.password);
      userModel.find({ "email": db.email }, function (err, data) {
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
             db.save(function (err) {
                 console.log("success");
                 if (err) {
                    {
                        response = { "error": false, "message": "Registration Successful" }
                    }
                    console.log(req.body);
                   return res.status(202).send(response);
                } 
                 else 
                 {
                 response = {
                    "error": true,
                    "message": " error storing data "
                }
            }
        });
    }
     });
    }

    exports.listOfUsers=function (req,res) {
        // return res.status(200).send("all good");
        var userModel = require('../model/users.js');
        var response = {};
        var arrList=[];
        var userid=req.params.id;
        userModel.find({"_id":{$ne:userid }},function (err,data) {
            console.log(data);
            for(key in data){
                    arrList.push({loginId:data[key].loginId,
                                            userid:data[key]._id});
            }
            if(err)
                {
                    response={ "error":true,
                                "message":"error retrieving data"
                    }
                    return res.status(401).send(response);
                }
                else{
                    response={
                        "error":false,
                        "message":arrList
                    }
                }
            return res.status(200).send(response);
        })
    }
exports.addtodb=function (userid,username,message,date) {
        var userModel = require('../model/users2');
        var db = new userModel();
        var response={};
        db.message=message;
        db.date=date;
        db.userid=userid;
        db.username=username;
        db.save(function (err) {
            if (err) {
                response = {
                    "error": true,
                    "message": "error storing data"
                }
            }
            else {
                response = { "error": false, "message": "succesfully added to database" }
            }
        });
        console.log(response)
    
    }
exports.getmsgs=function(req,res){
        var userModel = require('../model/users2');
        var response = {};
        userModel.find({},function(err,data){
            if(data){
                response={
                    "error":false,
                    "message":data
                    
                }
                res.status(200).send(response);
            }
            else{
                response={
                    "error":true,
                    "message":"something went wrong",
                    
                }
                console.log(err);
                res.status(401).send(response);
            }
           
        })
    }
    exports.addtodbp=function (senderId,receiverId,senderName,receiverName,message,date) {
        var userModel = require('../model/users3');
        var db = new userModel();
        var response = {};
        db.message = message;
        db.date = date;
        db.senderId = senderId;
        db.receiverId = receiverId;
        db.senderName = senderName;
        db.receiverName = receiverName;
        db.save(function (err) {
            if (err) {
                response = {
                    "error": true,
                    "message": "error storing data"
                }
            }
            else {
                response = { "error": false, "message": "succesfully added to database" }
            }
        });
        console.log(response)
    
    } 
    exports.getmsgsp=function(req,res){
        var userModel = require('../model/users3');
        var response = {};
        userModel.find({$or:[{"senderId": req.params.senderId, "receiverId": req.params.receiverId},{"senderId": req.params.receiverId, "receiverId": req.params.senderId}]},function(err,data){
            if(data){
                response=
                {
                    "error":false,
                    "message":data
                    
                }
                res.status(200).send(response);
            }
            else{
                response={
                    "error":true,
                    "message":"something went wrong",
                    
                }
                console.log(err);
                res.status(401).send(response);
            }
           
        })
    }