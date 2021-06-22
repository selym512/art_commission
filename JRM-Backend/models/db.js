const mysql = require("mysql");
const dbConfig = require("../config/db.config");

const conn = mysql.createConnection({
    host : dbConfig.HOST,
    user : dbConfig.USER,
    password : dbConfig.PASS,
    database : dbConfig.DATA
});

// Open MySQL connection
conn.connect(error => {
    if(error) {console.log(error); throw error ;}
    console.log(`Successfully connected to ${dbConfig.HOST}.${dbConfig.DATA}`);
});

module.exports = conn;