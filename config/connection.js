require('dotenv').config();

const Sequelize = require('sequelize');


let sequelize = process.env.JAWSDB_URL
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL)
} else {
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    dialectOptions: {
      decimalNumbers: true,
    }
  });

}



module.exports = sequelize;
