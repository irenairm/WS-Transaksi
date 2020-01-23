const mysql = require('mysql');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'transaksi_engima',
});

con.connect(function(err) {
  if (err) throw err;
});

module.exports = con;
