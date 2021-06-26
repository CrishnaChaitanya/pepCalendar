// To connect to mysql
const mysql = require("mysql")

function getConnection(){
    let connection = mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"",
        database:"pepcalender"
    })
    return connection
}

module.exports.getConnection = getConnection