const sql = require('./db');

/**
 * 
 * @param {object} user 
 */
const User = function(user){                                        //  | Type                                                                  | Null  | Default               | Unique    | Key
    this.user_id                    = user.user_id;                 //  | varchar(255)                                                          | NO    | NULL                  | YES       | PRI
    this.session_id                 = user.session_id               //  | varchar(255)                                                          | NO    |                       |           |
    this.date_session_id_created    = user.date_session_id_created  //  | datetime                                                              | NO    | NULL                  |           |
    this.email                      = user.email;                   //  | varchar(60)                                                           | NO    | NULL                  | YES       | 
    this.account_type               = user.account_type;            //  | enum('Admin', 'Support', 'Artist', 'Commissioner', 'Not Confirmed')   | NO    | 'Not Confirmed'       |           | 
    this.username                   = user.username;                //  | varchar(60)                                                           | YES   | NULL                  |           | 
    this.password                   = user.password;                //  | varchar(255)                                                          | NO    | NULL                  |           | 
    this.verified                   = user.verified;                //  | tinyint(1)                                                            | NO    | 0                     |           | 
    this.date_verified              = user.date_verified;           //  | datetime                                                              | YES   | NULL                  |           | 
    this.date_created               = user.date_created;            //  | datetime                                                              | NO    | CURRENT_TIMESTAMP     |           |
    this.pass_last_changed          = user.pass_last_changed;       //  | datetime                                                              | YES   | NULL                  |           | 
    this.deactivated                = user.deactivated;             //  | tinyint(1)                                                            | YES   | 0                     |           | 
    this.date_deactivated           = user.date_deactivated;        //  | datetime                                                              | YES   | NULL                  |           | 
}

/** inserts a new user with just an email address and a password.
 * I REALLY FUCKING HOPE YOU HASHED THE PASSWORD
 * @param {object} newUser 
 * 
 * @return {object} result
 */
User.create_user = (newUser, result) =>{

    // TODO : this
    // Check if the email already exists in the database.
    // this.find_email(newUser.email)

    var query = `INSERT INTO user (user_id, email, password) VALUES ("${newUser.user_id}","${newUser.email}", "${newUser.password}")`;
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

        //console.log("created user :", response);
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

/** Sets the session token, based on the user ID
 *
 * @param {*} user 
 * @param {*} result 
 */
 User.set_session_id_by_user_id = (user, result) =>{
    var query = `UPDATE user SET session_id="${user.session_id}", date_session_id_created=NOW() WHERE user_id="${user.user_id}"`;
    sql.query(query, (err, res)=>{
        if(err){
            console.log(`error : ${err}`);
            result(err, null);
            return;
        }
        result(null, res);
    });
}

/** Returns certain values based on session ID
 * 
 * the values returned are:
 * user_id,verified,username,account_type
 * 
 * @param {*} user 
 * @param {*} result 
 */
 User.get_data_by_session_id = (user, result) =>{
    var query = `SELECT user_id, email, username, account_type, date_created, verified FROM user WHERE session_id="${user.session_id}"`

    sql.query(query, (err, res)=>{
        if(err){
            console.log(`error : ${err}`)
            result(err, null)
            return;
        }
        result(null, res);
    })
}

/** I have no idea why I pre made this
 * 
 * @param {*} user 
 * @param {*} result 
 */
User.get_session_id_by_user_id = (user, result) =>{
    var query = `SELECT session_id FROM user WHERE`;
}

/** Returns date of when a user id's session was created.
 * 
 * The controller should handle whether or not the current time is past the date of when the session_id was created
 * It should be erased, which should cause a user to log out.
 * @param {*} user 
 * @param {*} result 
 */
User.get_session_id_created_by_by_user_id = (user, result) =>{

}

/** Verifies the user
 * 
 * @param {Object} user 
 * @return {Object} result 
 */
User.verify_user = (user, result) => {
    var query = `UPDATE user SET verified = NOT verified, date_verified=NOW() WHERE user_id = "${user.user_id}"`;
    sql.query(query, (err, res)=>{
        if(err){
            console.log(`error : ${err}`);
            result(err, null);
            return;
        }
        result(null, res);
    })
}

/** Sets user account type
 * 
 * @param {*} user 
 * @return {*} result 
 */
User.set_account_type = (user, result) =>{
    var query = `UPDATE user SET account_type="${user.account_type}" WHERE user_id="${user.user_id}"`;
    console.log(query);
    sql.query(query, (err, res)=>{
        if(err){
            console.log(`error : ${err}`);
            result(err, null);
            return;
        }
        result(null, res);
    });
}


/** Deactivates the user
 * 
 * @param {Object} user 
 * @return {Object} result 
 */
User.deactivate_user = (user, result) => {
    var query = `UPDATE user SET deactivated = NOT deactivated, date_deactivated=NOW() WHERE user_id="${user.user_id}"`
}

module.exports = User;

User.get_all_users = (user, result) =>{
    var query = `SELECT * from users;`
}