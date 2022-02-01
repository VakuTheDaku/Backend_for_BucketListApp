const Sequelize = require('sequelize')
const Appusers= require('../models/models.js')
const dotenv= require('dotenv')
dotenv.config()
const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect : process.env.DIALECT,
  
  
});
  Appusers.sync();  
  
module.exports = sequelize