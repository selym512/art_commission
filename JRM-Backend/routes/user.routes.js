module.exports = app => {
    const users = require("../controllers/user.controller.js");

    // Create a new user
    app.post("/user/create_user", users.create_user);

    //app.get("/user/get_all_users", users.get_all_users);
}