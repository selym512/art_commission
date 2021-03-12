const bcrypt = require("bcrypt"); // We will only be using bcrypt until the issue robert has opened up with argon2 has been resolved

const User = require("../models/user.models");

/** The controller function for creating a new user
 * 
 * @param {Object} req 
 * @return {*} res 
 */
exports.create_user = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty"
        });
        
    }
    
    if(!req.body.email){
        console.log("email empty");
        res.status(200).send({
            message : "email cannot be empty"
        })
        return;
    }
    if(!req.body.pass){
        console.log("pass empty");
        res.status(200).send({
            message : "pass cannot be empty"
        })
        return;
    }

    console.log(req.body.pass);
    var plaintextpass = req.body.pass;

    // HASH PASSWORD HERE
    bcrypt.hash(plaintextpass, 10, (err, hash) => {
        if (err) throw err;

        const user = new User({
            email       : req.body.email,
            password    : hash,
            plainpass   : plaintextpass,
        });

        // INSERT USER HERE
        User.create_user(user, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "Some error occured while creating the user."
                });
            } else {
                console.log(data);
                res.send(data); // Returns user ID, user email, and user password (hashed)
            }
        });
    });
}

exports.login_user = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty"
        });
        
    }
}

/** The controller function for getting all users
 * 
 * @param {*} req 
 * @param {*} res 
 */
//exports.get_all_users = (req, res) =>{
//    //Validate request
//    if (!req.body) {
//        res.status(400).send({
//            message: "Content cannot be empty"
//        });
//    }
//
//    var something = req.body.q;
//
//    User.get_all_users(something, (err, data) =>{
//        if(err){
//            res.status(500).send({
//                message : err.message || "Some error occured while creating the user"
//            });
//        } else{
//            console.log(data);
//            res.send(data);
//        }
//    })
//
//}