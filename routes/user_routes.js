const express=require('express')
const router=express.Router()
const bcrypt = require('bcryptjs/dist/bcrypt');
const Appusers=require('../models/models')
var sess;
router.post("/",(req,res,next)=>{
    sess=req.session
    email=req.body.email
    password=req.body.password
    
    Appusers.findAll({where: {email: email}}).then(async (team)=>{
        
        if(team[0]!=null){
        bcrypt.compare(password, team[0].password).then((result)=>{
            
            if(result) {
                sess.isLoggedIn=true
                sess.name=team[0].name
                
               
                
                res.json({status: req.session.isLoggedIn, name: req.session.name})
                
                
            }
            else{
                req.session.isLoggedIn=false
                req.session.name=team[0].name
                return res.json({status: "password doesn't match"})
                
            }
        })
        }
        else{
            req.session.isLoggedIn=false
                req.session.name=team[0].name
            return res.json({status: "Enter a valid username"})
        }
    
    }).catch((err)=>console.log(err))
}
)
router.get("/get-username",(req,res,next)=>{
    
    
    
    return res.json({name: sess.name})
})
router.get("/logout",(req,res,next)=>{
    
    sess.destroy()
    res.json({name: sess.name})
    
    
})
router.post('/create-user', async(req,res,next)=>{
    
    const name=req.body.name
    const email=req.body.email;
    req.session.isLoggedIn=false
    req.session.name=team[0].name
    let hashpass=await bcrypt.hash(req.body.password, 8)
    
    if(email!="" || name !=""){
        
    Appusers.create({
        name: name,
        email: email,
        password: hashpass,
       
    }).then((result)=>{
        if(result){
            req.session.isLoggedIn=true
            req.session.name=team[0].name
            return res.json({status: "Registered"})
        }
    }).catch(err=>{
        return res.json({status: "Error"})
        
    })
}else{
    return res.json({status: "Username and Mail cannot be empty"})
}
}) 


module.exports=router