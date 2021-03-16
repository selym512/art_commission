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

/**
 * The controller for logging in a user
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.login_user = async (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty"
        });
    }

    if(!req.body.email){
        console.log("email empty");
        res.status(400).send({
            message : "email cannot be empty"
        })
        return;
    }
    if(!req.body.pass){
        console.log("pass empty");
        res.status(400).send({
            message : "pass cannot be empty"
        })
        return;
    }


    var email = req.body.email;
    var passGuess = req.body.pass;

    //console.log(req.body);

    // Get password based on Email

    User.get_data_by_email(email, async (err, data)=>{
        if(err) {
            res.status(500).send({
                message : err.message || "Some error occuared while finding the user by email"
            })
        }else{
            // If there was a message, it will return a HTTP 400 with just a message for the front end to handle
            //if(data.message){
            //    res.send(data);
            //}
            //console.log(data);
            if(data.found){
                bcrypt.compare(passGuess, data.password, (err, res2)=>{
                    if(err){
                        console.log(`passGuess : ${passGuess}\ndata.password : ${data.password}`)
                        throw err;
                    } 
                    // HAHAHAHAH I NAMED IT res2 BECAUSE FUCK YOU THATS WHY
                    if(res2){
                        /// EEHH FUCKIN MAYBE SEND A TOEKN?
                        res.status(200).send({
                            message : "log in successful"
                        });
                    }else{
                        res.status(200).send({
                            message : "passwords do not match"
                        })
                    }
                });
            } else {
                res.status(200).send({
                    message : data.message
                })
            }
        }
    });

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