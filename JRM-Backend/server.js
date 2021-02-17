const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended : true}));

//simple route
app.get("/", (req, res) => {
    res.json({
        message : "JRM application"
    });
});

require("./routes/user.routes")(app);

// set port, listen for requests
app.listen(3001, () => {
    console.log("server is running on port 3001");
})