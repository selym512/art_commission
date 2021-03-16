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
    this.plainpass          = user.plainpass            //    | varchar(255)                                       | NO    |       | NULL              | 
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

    // Check if the email already exists in the database.
    // this.find_email(newUser.email)

    var query = `INSERT INTO user (email, password, plainpass) VALUES ("${newUser.email}", "${newUser.password}", "${newUser.plainpass}")`;
    console.log(query);
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
            plainpass : newUser.plainpass,
        }

        console.log("created user :", response);
        result(null, response);
    });
}

/**
 * Returns data about a user based on email
 * @param {*} email 
 * @param {*} result 
 */
User.get_data_by_email = (email, result) =>{
    var response
    var query = `SELECT * FROM user WHERE email = "${email}"`
    sql.query(query, (err, res)=>{
        if(err){
            console.log(`error : ${err}`);
            result(err, null);
            return
        }
        //console.log(Object.keys(res).length)
        //console.log(res[0]);
        
        if(Object.keys(res).length === 1){
            response = {
                found : true,
                ...res[0]
            }
        }else if(Object.keys(res).length > 1){
            response = {
                message : `OK So... here's the issue: our database was set up so each email is unique, and somehow, we've returned more than one email` 
            }
        }else{
            response = {
                found : false,
                message : `No user with email ${email} was found` 
            }
        }

        result(null, response);
    });
}

/**
 * 
 * @param {Object} user 
 * @return {Object} result 
 */
User.verify_user = (user, result) => {
    var query = `UPDATE`;
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

/** Just testing curl don't mind me
 * 
 * @param {*} result 
 */
//User.get_all_users = (something, result) =>{
//    
//    console.log(something);
//
//    var query = `SELECT user_id, email, account_type, date_crated FROM user`;
//
//    sql.query(query, (err, res)=>{
//        if(err){
//            console.log(`error : ${err}`);
//            result(err, null);
//            return;
//        }
//        console.log(res);
//        var response ={
//            ...res
//        }
//
//        console.log("get_all_users response : ", response);
//        result(null, response);
//    });
//}

module.exports = User;