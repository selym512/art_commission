/**
 * User Router
 * @param {*} app 
 */
module.exports = app => {
    const users = require("../controllers/user.controller.js");

    // Create a new user
    app.post("/user/create_user", users.create_user);

    // Log in a user
    app.post("/user/login_user", users.login_user);

    // Get data by session_id
    app.post("/user/data_s_id", users.data_s_id);
    // Get all users
    //app.get("/user/get_all_users", users.get_all_users);
}