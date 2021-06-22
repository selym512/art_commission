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
    app.post("/user/data_by_session_id", users.data_by_session_id);

    // Verify user by user_id
    app.post("/user/verify_user", users.verify_user);

    // Set account type by user_id
    app.post("/user/set_account_type", users.set_account_type);

    // Get all users
    app.get("/user/get_all_users", users.get_all_users);
}