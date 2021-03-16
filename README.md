# JRM-Project
JRM Project

to get started develping, CD into either directory and run `npm install` to get the necessary packages.

>To run the API, CD into `JRM-Backend` and run `node server.js`

>To run the front end, CD into `jrm-front` and run `npm start`

There is a document called JRM_DB.sql. ask rob for it to create the tables.

> If you're having trouble with the error `ER_NOT_SUPPORTED_AUTH_MODE`, run the command `ALTER USER 'JRM'@'localhost' IDENTIFIED WITH mysql_native_password BY '/*YOUR PASSWORD HERE*/'`

.env in the back end requires the following fields: 
```
PORT=

DB_HOST=
DB_USER=
DB_PASS=
DB_DATA=

```