const sql = require('./db');

/**
 * 
 * @param {object} user 
 */
const User = function(user){                                        //  | Type                                                                  | Null  | Key   | Default           | Extra
    this.user_id                    = user.user_id;                 //  | varchar(255)                                                          | NO    | PRI   | NULL              | 
    this.session_id                 = user.session_id               //  | varchar(255)                                                          | NO    |       |                   |
    this.date_session_id_created    = user.date_session_id_created  //  | datetime                                                              | NO    |       | NULL              |
    this.email                      = user.email;                   //  | varchar(60)                                                           | NO    | UNI   | NULL              | 
    this.account_type               = user.account_type;            //  | enum('Admin', 'Support', 'Artist', 'Commissioner', 'Not Confirmed')   | NO    |       | 'Not Confirmed'   | 
    this.username                   = user.username;                //  | varchar(60)                                                           | YES   |       | NULL              | 
    this.password                   = user.password;                //  | varchar(255)                                                          | NO    |       | NULL              | 
    this.verified                   = user.verified;                //  | tinyint(1)                                                            | NO    |       | 0                 | 
    this.date_verified              = user.date_verified;           //  | datetime                                                              | YES   |       | NULL              | 
    this.date_created               = user.date_created;            //  | datetime                                                              | NO    |       | CURRENT_TIMESTAMP |
    this.pass_last_changed          = user.pass_last_changed;       //  | datetime                                                              | YES   |       | NULL              | 
    this.deactivated                = user.deactivated;             //  | tinyint(1)                                                            | YES   |       | 0                 | 
    this.date_deactivated           = user.date_deactivated;        //  | datetime                                                              | YES   |       | NULL              | 
}

/** inserts a new user with just an email address and a password.
 * I REALLY FUCKING HOPE YOU HASHED THE PASSWORD
 * @param {object} newUser 
 * 
 * @return {object} result
 */
User.create_user = (newUser, result) =>{

    // Check if the email already exists in the database.
    // this.find_email(newUser.email)

    var query = `INSERT INTO user (user_id, email, password) VALUES ("${newUser.user_id}","${newUser.email}", "${newUser.password}")`;
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
        var rows = Object.keys(res).length
        if(rows === 1){
            response = {
                found : true,
                ...res[0]
            }
        }else if(rows > 1){
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
 * Sets the session token, based on the user ID
 * @param {*} user 
 * @param {*} result 
 */
User.set_session_id_by_user_id = (user, result) =>{
    var query = `UPDATE user SET session_id:="${user.session_id}", date_session_id_created=NOW() WHERE user_id="${user.user_id}"`;
    sql.query(query, (err, res)=>{
        if(err){
            console.log(`error : ${err}`);
            result(err, null);
            return;
        }
        result(null, res);
    });
}

/**
 * 
 * @param {*} user 
 * @param {*} result 
 */
User.get_session_id_by_user_id = (user, result) =>{
    var query = `SELECT session_id FROM user WHERE`;
}

User.get_session_id_created_by_user_id = (user, result) =>{

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