const express=require('express')
const mysql=require('mysql2/promise')
const app=express();
const router=require('./routes/user_routes')
const sequelize= require('./util/database')
const bodyparser= require('body-parser');
var session = require('express-session');
const dotenv= require('dotenv')
dotenv.config()
const cookieparser=require('cookie-parser')
var MySQLStore = require('express-mysql-session')(session);
var options = {
	host: process.env.HOST,
	
	user: process.env.USER,
	password: process.env.PASSWORD,
	database: process.env.DATABASE,
    
};
var sessionStore = new MySQLStore(options);
app.use(session({
    secret: 'Hey i am vaku the daku', resave: false, saveUninitialized: false,store: sessionStore
}))
app.use(cookieparser());
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json());


PORT=3000
app.use(express.json())

app.use("/",router)
sequelize.sync().then(result=>{
    console.log(result)
    
}).catch(err=>{
    console.log(err)
})
app.listen(process.env.PORT || PORT, function(){
	console.log(`server started on port ${PORT}`)
})