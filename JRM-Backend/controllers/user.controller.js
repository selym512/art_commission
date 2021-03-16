const bcrypt = require("bcrypt"); // We will only be using bcrypt until the issue robert has opened up with argon2 has been resolved
const {v4 : uuidv4 } = require('uuid');
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

    
    // HASH PASSWORD HERE
    bcrypt.hash(req.body.pass, 10, (err, hash) => {
        if (err) throw err;

        const user = new User({
            email       : req.body.email,
            password    : hash,
            user_id     : uuidv4()
        });

        console.log(user);

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

    // Get password based on email address
    User.get_data_by_email(email, async (err, data)=>{
        if(err) res.status(500).send({message : err.message || "Some error occuared while finding the user by email"})
        if(data.found){ // if a user was found
            // compare the password
            bcrypt.compare(passGuess, data.password, (err, match)=>{
                if(err) throw err;
                // if the passwords match
                if(match){
                    // Create a session_id, store it in the database, return it to the client
                    var session_id = uuidv4();
                    const user = {
                        user_id : data.user_id,
                        session_id : session_id,
                    }
                    User.set_session_id_by_user_id(user, async (err, data)=>{
                        if (err) res.status(500).send({message : err.message || "SOme error occured while setting the session ID"})
                        res.status(200).send({session_id : session_id});
                    })
                }else{ // if the passwords do not match
                    res.status(200).send({
                        message : "passwords do not match"
                    })
                }
            });
        } else { // if a user was found
            res.status(200).send({
                message : data.message
            })
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