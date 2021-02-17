const sql = require('./db');

// constructor
const User = function(user){
    this.id                 = user.id;
    this.email              = user.email;
    this.account_type       = user.account_type;
    this.username           = user.username;
    this.password           = user.password;
    this.verified           = user.verified;
    this.date_verified      = user.date_verified;
    this.date_created       = user.date_created;
    this.pass_last_changed  = user.pass_last_changed;
    this.deactivated        = user.deactivated;
    this.date_deactivated   = user.date_deactivated;
}

module.exports = User;