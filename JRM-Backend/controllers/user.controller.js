const bcrypt = require("bcrypt"); // We will only be using bcrypt until the issue robert has opened up with argon2 has been resolved
const {v4 : uuidv4 } = require('uuid');
const User = require("../models/user.models");

/** The controller function for creating a new user
 * @param {Object} req 
 * @return {*} res 
 */
exports.create_user = (req, res) => {
    // Validate request
    if (!req.body) res.status(400).send({ message: "Content cannot be empty" });
    
    // These should also be handled in the client
    if(!req.body.email){
        res.status(200).send({ message : "email cannot be empty" });
        return; // I'm not sure if we still nede these returns
    }
    if(!req.body.pass){
        res.status(200).send({ message : "pass cannot be empty" });
        return;
    }

    // TODO : check if email alrady exists in the database
    
    // HASH PASSWORD HERE
    bcrypt.hash(req.body.pass, 10, (err, hash) => {
        if (err) throw err;

        const user = new User({
            email       : req.body.email,
            password    : hash,
            user_id     : uuidv4()
        });

        // INSERT USER HERE
        User.create_user(user, (err, data) => {
            if (err) res.status(500).send({ message: err.message || "Some error occured while creating the user." });
            res.send(data); // Returns user ID, user email, and user password (hashed) (Why?)
        });
    });
}

/** The controller for logging in a user
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.login_user = async (req, res) => {
    // Validate request
    if (!req.body) res.status(400).send({message: "Content cannot be empty"});

    if(!req.body.email){
        res.status(200).send({ message : "email cannot be empty" });
        return;
    }
    if(!req.body.pass){
        res.status(200).send({ message : "pass cannot be empty" });
        return;
    }

    var email = req.body.email;
    var passGuess = req.body.pass;

    User.get_data_by_email(email, async (err, data)=>{
        if(err) res.status(500).send({message : err.message || "Some error occuared while finding the user by email"});
        
        if(data.found){ // if a user was found
            // compare the password
            bcrypt.compare(passGuess, data.password, (err, match)=>{
                if(err) throw err;
                // if the passwords match
                if(match){
                    // Create a session_id, 
                    var session_id = uuidv4();
                    const user = {
                        user_id : data.user_id,
                        session_id : session_id,
                    }
                    // store it in the database, 
                    User.set_session_id_by_user_id(user, async (err, data)=>{
                        if (err) res.status(500).send({message : err.message || "Some error occured while setting the session ID"})
                        // return it to the client
                        res.status(200).send({session_id : session_id});
                    })
                }else{ // if the passwords do not match
                    res.status(200).send({
                        message : "passwords do not match"
                    })
                }
            });
        } else res.status(200).send({ message : data.message });  // if a user was NOT found
        
    });

}

/** The controller for getting user data by session_id
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.data_by_session_id = (req,res) =>{
    if(!req.body) res.status(400).send({message: "Content cannot be empty"});
    if(!req.body.session_id) res.status(400).send({message: "User not logged in"});

    var session_id = req.body.session_id;

    const user = new User({
        session_id : session_id,
    })

    User.get_data_by_session_id(user, (err, data)=>{
        if(err) res.status(500).send({message : err || "Some error occured retrieving data"});
        res.status(200).send(data);
    });
}

/** The controller for verifying a user
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.verify_user = (req, res) =>{
    if(!req.body) res.status(400).send({message : "Content cannot be empty"});
    if(!req.body.user_id) res.status(400).send({message : "No user ID in body"});

    const user = new User({
        user_id : req.body.user_id,
    });

    User.verify_user(user, (err, data)=>{
        if(err) res.status(500).send({message : err || "Some error occured while verifying user"});
        res.status(200).send(data);
    })
}

exports.set_account_type = (req, res) =>{
    if(!req.body) res.status(400).send({message : "Content cannot be empty"});
    if(!req.body.user_id) res.status(400).send({message : "No user_id in body"});
    if(!req.body.account_type) res.status(400).send({message : "No account_type in body"});

    const user = new User({
        user_id : req.body.user_id,
        account_type : req.body.account_type,
    });

    User.set_account_type(user, (err, data)=>{
        if(err) res.status(500).send({message : err || "Some error occured while setting account type"});
        res.status(200).send(data);
    })
}

/** The controller for deactivating a user
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.deactivate_user = (req, res) =>{
    if(!req.body) res.status(400).send({message : "Content cannot be empty"});
    if(!req.body.user_id) res.status(400).send({message : "No user ID in body"});

    const user = new User({
        user_id : req.body.user_id,
    });

    User.deactivate_user(user, (err, data)=>{
        if(err) res.status(500).send({message : err || "Some error occured while deactivating user"});
        res.status(200).send(data);
    })
}
