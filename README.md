# JRM-Project
JRM Project

to get started develping, CD into either directory and run `npm install` to get the necessary packages.

`d.config.js` I added to `.gitignore` because of password scraping bots that I'm afraid of (I've had a bad experience with keys being public), so you need to write your own file called `db.config.js` and have it formatted as such:
```
module.exports = {
    HOST : "localhost",
    USER : "JRM",
    PASS : "YOURPASSWORDHERE",
    DATA : "JRM_Project"
};
```
and placed in `JRM-Project/JRM-Backend/config`

> If you're having trouble with the error `ER_NOT_SUPPORTED_AUTH_MODE`, run the command `ALTER USER 'JRM'@'localhost' IDENTIFIED WITH mysql_native_password BY '/*YOUR PASSWORD HERE*/'`