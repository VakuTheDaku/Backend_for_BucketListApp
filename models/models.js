const Sequelize = require('sequelize')

const sequelize = new Sequelize('bucketlist', 'root', '', {
    host: "127.0.0.1",
    dialect : 'mysql',
    port: '8111',
    
  });
const Appusers = sequelize.define('appusers', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false,
    },
   
})
module.exports= Appusers