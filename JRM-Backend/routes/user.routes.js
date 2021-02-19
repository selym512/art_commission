module.exports = app => {
    const users = require("../controllers/user.controller.js");

    // Create a new user
    app.post("/user/create_user", users.create_user);
}