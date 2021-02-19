const { response } = require('express');
const sql = require('./db');

/**
 * 
 * @param {object} user 
 */
const User = function(user){                            //    | Type                                               | Null  | Key   | Default           | Extra
    this.id                 = user.id;                  //    | int unsibned                                       | NO    | PRI   | NULL              | auto_increment
    this.email              = user.email;               //    | varchar(60)                                        | NO    | UNI   | NULL              | 
    this.account_type       = user.account_type;        //    | enum('Admin', 'Support', 'Artist', 'Commissioner') | NO    |       | NULL              | 
    this.username           = user.username;            //    | varchar(60)                                        | YES   |       | NULL              | 
    this.password           = user.password;            //    | varchar(255)                                       | NO    |       | NULL              | 
    this.verified           = user.verified;            //    | tinyint(1)                                         | NO    |       | 0                 | 
    this.date_verified      = user.date_verified;       //    | datetime                                           | YES   |       | NULL              | 
    this.date_created       = user.date_created;        //    | datetime                                           | NO    |       | CURRENT_TIMESTAMP | DEFAULT_GENERATED
    this.pass_last_changed  = user.pass_last_changed;   //    | datetime                                           | YES   |       | NULL              | 
    this.deactivated        = user.deactivated;         //    | tinyint(1)                                         | YES   |       | 0                 | 
    this.date_deactivated   = user.date_deactivated;    //    | datetime                                           | YES   |       | NULL              | 
}

/** inserts a new user with just an email address and a password.
 * I REALLY FUCKING HOPE YOU HASHED THE PASSWORD
 * @param {object} newUser 
 * 
 * 
 * 
 * @return {object} result
 */
User.create_user = (newUser, result) =>{

    var query = `INSERT INTO user (email, password) VALUES ("${newUser.email}", "${newUser.password}")`;

    sql.query(query, (err, res)=>{
        if(err){
            console.log(`error : ${err}`);
            result(err, null);
            return;
        }

        var response = {
            id : res.insertId,
            email : newUser.email,
            password : newUser.password,
        }

        console.log("created user :", response);
        result(null, response);
    });
}

/**
 * 
 * @param {Object} user 
 * @return {Object} result 
 */
User.verify_user = (user, result) => {

}

/**
 * There will be more calls here, deactivate_user will be last because thats
 * how baldy likes 
 */

/**
 * 
 * @param {Object} user 
 * @return {Object} result 
 */
User.deactivate_user = (user, result) => {

}

module.exports = User;