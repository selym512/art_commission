const dotenv = require('dotenv').config();
const express = require("express");
const helmet = require('helmet')
const hpp = require('hpp')
const csurf = require('csurf');

const PORT = process.env.PORT || 3001;

// create express app
const app = express();

// parse requests of content-type: application/json
app.use(express.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({extended:true}));

//set security configurations
app.use(helmet());
app.use(hpp());

//app.use(csurf());

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
app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
})