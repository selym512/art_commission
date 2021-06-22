# JRM-Project
To get started develping, CD into either directory and run `npm install` to get the necessary packages.

>To run the API, CD into `JRM-Backend` and run `node server.js`

>To run the front end, CD into `jrm-front` and run `npm start`

There is a document called JRM_DB.sql. ask rob for it to create the tables.

START_SERVER= sudo /etc/init.d/mysql start

If it says you are missing the .env file in `JRM-Backend`, create a file called
`.env` and add the following fields,
```
PORT=%Your desired port number, this doesn't really matter as long as its not 3000%

DB_HOST=%For the time being it should be local host%
DB_USER=%The user for the database, which is seen in JRM_DB.sql%
DB_PASS=%The password for the user, which is seen in JRM_DB.sql%
DB_DATA=%The database to be used, which should be JRM_Project I think%
```