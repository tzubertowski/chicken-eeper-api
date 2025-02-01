const mysql = require('mysql2/promise');

const connectionConfig = {
  host: process.env.MYSQL_HOST || 'mysql',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'password',
  database: process.env.MYSQL_DATABASE || 'testdb'
};

const pool = mysql.createPool(connectionConfig);

module.exports = pool;
