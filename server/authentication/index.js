var jwt = require('jsonwebtoken');
const obj = require('../config/auth.js')
const secret = obj.secret;
console.log(secret)
var auth = function (req, res, next) {
    var token = req.headers["token"];
    var respo = {
        'message': "Unauthorised Entry "
    };
    console.log("in auth ", token);
    jwt.verify(token, secret, function (err, decoded) {
        if (err) {
            console.log(err)
            return res.status(401).send(respo);
        }
        else {
            console.log(decoded);
            next();
        }
    });
}
module.exports = auth;