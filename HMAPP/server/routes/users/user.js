const router = require('express').Router();
const user = require('../../Database_schemas/Users_schema')
const report = require('../../Database_schemas/Report_schema')
const d_response = require('../../Database_schemas/D_Response_schema')
const validation=require('../../validation/alluservalidations')
const bcrypt= require('bcrypt')
const jwt= require('jsonwebtoken')
const dotenv= require('dotenv')
dotenv.config();


/* ------CREATE USER -------
---------------------------- */
router.post('/register',async(req,res)=>{
    if(req.body.password != req.body.cpassword) return res.send({"error":"Password should match!"})

    const {error}=validation.createuservalidation(req.body)
    if(error) return res.send({"error":error.details[0].message})

        const salt = await bcrypt.genSalt(10);
        const hashedpassword= await bcrypt.hash(req.body.password,salt)

        const newuser = new user({
            name:req.body.name,
            emailorphone:req.body.emailorphone,
            password:hashedpassword
        })

        const isuser = await user.findOne({emailorphone:req.body.emailorphone})
        if(isuser){return res.send({"error":"User already exists"})}
        if(!isuser){
            const savednewuser = await newuser.save();
            if(savednewuser){
              return res.send({"success": "true"})
            }
            else{return res.send({"error":"Error saving to database"})}
        }
})


/* ------LOGIN USER --------
---------------------------- */
router.post('/login',async(req,res)=>{

    const {error}=validation.userloginvalidation(req.body)
    if(error) return res.send({"error":error.details[0].message})

    const usernameexist =await user.findOne({emailorphone : req.body.emailorphone})
    if(!usernameexist) {
      return res.send({"error":"Wrong username or password"})
    }

    async function checkpassword(){
        dbpassword= await usernameexist.password
        const validpassword = bcrypt.compareSync(req.body.password, await dbpassword)
        if(!validpassword) return(false); return(true);
    }

    if(await checkpassword()){
        token=jwt.sign({id:usernameexist._id,name:usernameexist.name},process.env.jwt_master_secret);
        res.send({"success":await token,"url":"/dashboard"})
    }else return res.send({"error":"Wrong username or password"})
})

/* ------USER Add Report--------
---------------------------- */
router.post('/addReport',async(req,res)=>{

    const {error}=validation.userreportdatavalidation(req.body)
    if(error) return res.send({"error":error.details[0].message})
    try{
        const token=await req.body.token;

        const payload=jwt.verify(await token,process.env.jwt_master_secret);
        if(!payload){
          return res.send({"error":"Could not verify"});
        }

        try{
          const userdata =await user.findOne({"_id":await payload.id,"name": await payload.name});
            if(userdata) {
              req.body.created = new Date();

              const newreport = new report({
                  subject:req.body.subject,
                  issue:req.body.issue,
                  image:req.body.image,
                  user_id:userdata._id,
                  created:req.body.created
              })

              const addAReport = await newreport.save();
              if(addAReport){
                return res.send({"success": "true","reports":newreport})
              }
              else{
                return res.send({"error":"Error saving to database"});
              }
            }
            else {
              return res.send({"error":"User doesn't exist"})
            }
        }catch(err){
          return res.send({"error":"Session expired, Login again to continue"});
        }
    }catch(err){
      return res.send({"error":"Session expired, Login again to continue"});
    }

})


/* ------GET USER REPORTS ------
---------------------------- */
router.post('/getReports',async(req,res)=>{
  try{
      const token=await req.body.token;

      const payload=jwt.verify(await token,process.env.jwt_master_secret);
      if(!payload){
        return res.send({"error":"Could not verify"});
      }

      try{
        const userdata =await user.findOne({"_id":await payload.id,"name": await payload.name});
          if(userdata) {
            const datas = await report.find({"user_id":userdata._id});

            for(let i = 0; i < datas.length; i++){

              const response = await d_response.findOne({issue_id:datas[i]._id})

              datas[i]["response"] = response;
              if(datas[i]["response"] == null) {
                datas[i]["response"] = '0'
              }
            }

            return res.send({"success": "true","reports":datas});
          }
      }catch(err){
        return res.send({"error":"Session expired, Login again to continue"})
      }
  }catch(err){
    return res.send({"error":"Session expired, Login again to continue"})
  }

})

router.post('/verify',async(req,res)=>{
    try{
        const token=await req.body.token;

        if(!token) {
          return res.send({"error":"Invalid token"});
        }

        const payload=jwt.verify(await token,process.env.jwt_master_secret);
        if(!payload){
          return res.send({"error":"Could not verify"});
        }

        try{
          const userdata =await user.findOne({"_id":await payload.id,"name": await payload.name});
            if(userdata) return res.send({"success":"Found user","name": userdata.name});
        }catch(err){
          return res.send({"error":"Session expired, Login again to continue"});
        }
    }catch(err){
      return res.send({"error":"Session expired, Login again to continue"})
    }
})

module.exports=router;
