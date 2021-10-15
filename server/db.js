var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '753421',
  database : 'db_2'
});

connection.connect();
module.exports = connection;
