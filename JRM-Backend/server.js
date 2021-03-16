const express = require("express");
//const bodyParser = require("body-parser");
const session = require('cookie-session');
const helmet = require('helmet')
const hpp = require('hpp')
const csurf = require('csurf');

// create express app
const app = express();

// parse requests of content-type: application/json
app.use(express.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(express.urlencoded());

//set security configurations
app.use(helmet());
app.use(hpp());

// Set Cookie Sessions
app.use(
    session({
        name : 'JRM-Project Session',
        secret : 'JRM-ProjectSecret',
        expires : new Date(Date.now()+24*60*60*1000) // 24 hours
    })
)

//app.use(csurf());

//app.use(limiter);

let allowCrossDomain = function(req, res, next){
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    next();
}

app.use(allowCrossDomain);

//simple route
app.get("/", (req, res) => {
    res.json({
        message : "JRM application"
    });
});

require("./routes/user.routes")(app);

// set port, listen for requests
app.listen(3001, () => {
    console.log("server is running on port " + app.get('port'));
})