const router = require('express').Router();
const admin = require('../../Database_schemas/Admins_schema')
const user = require('../../Database_schemas/Users_schema')
const d_response = require('../../Database_schemas/D_Response_schema')
const report = require('../../Database_schemas/Report_schema')
const validation=require('../../validation/alluservalidations')
const bcrypt= require('bcrypt')
const jwt= require('jsonwebtoken')
const dotenv= require('dotenv')
dotenv.config();

/* ------CREATE USER -------
---------------------------- */
router.post('/register',async(req,res)=>{
    if(req.body.password != req.body.cpassword) return res.send({"error":"Password should match!"})

    const {error}=validation.createdoctorvalidation(req.body)
    if(error) return res.send({"error":error.details[0].message})

        const salt = await bcrypt.genSalt(10);
        const hashedpassword= await bcrypt.hash(req.body.password,salt)

        const newadmin = new admin({
            name:req.body.name,
            email:req.body.email,
            password:hashedpassword,
            image:req.body.image
        })

        const isadmin = await admin.findOne({email:req.body.email})
        if(isadmin){return res.send({"error":"Admin already exists"})}
        if(!isadmin){
            const savenewadmin = await newadmin.save();
            if(savenewadmin){
              return res.send({"success": "true"})
            }
            else{return res.send({"error":"Error saving to database"})}
        }
})


/* ------LOGIN USER --------
---------------------------- */
router.post('/login',async(req,res)=>{

    const {error}=validation.doctorloginvalidation(req.body)
    if(error) return res.send({"error":error.details[0].message})

    const adminexist =await admin.findOne({email : req.body.email})
    if(!adminexist) {
      return res.send({"error":"Wrong username or password"})
    }

    async function checkpassword(){
        dbpassword= await adminexist.password
        const validpassword = bcrypt.compareSync(req.body.password, await dbpassword)
        if(!validpassword) return(false); return(true);
    }

    if(await checkpassword()){
        token=jwt.sign({id:adminexist._id,name:adminexist.name},process.env.jwt_master_secret);
        res.send({"success":await token,"url":"/admin"})
    }else return res.send({"error":"Wrong username or password"})
})

/* ------USER Add Report--------
---------------------------- */
router.post('/addResponse',async(req,res)=>{

    const {error}=validation.doctorresponsedatavalidation(req.body)
    if(error) return res.send({"error":error.details[0].message})

    try{
        const token=await req.body.token;

        const payload=jwt.verify(await token,process.env.jwt_master_secret);
        if(!payload){
          return res.send({"error":"Could not verify"});
        }

        try{
          const admindata =await admin.findOne({"_id":await payload.id,"name": await payload.name});
            if(admindata) {
              req.body.created = new Date();

              const response = new d_response({
                  issue_id:req.body.issue_id,
                  doctor_id:admindata._id,
                  image:admindata.image,
                  message:req.body.message,
                  created:req.body.created
              })

              const addResponse = await response.save();
              if(addResponse){
                return res.send({"success": "true"})
              }
              else{
                return res.send({"error":"Error saving to database"})
              }
            }
        }catch(err){
          return res.send({"error":"Session expired, Login again to continue"})
        }
    }catch(err){
      return res.send({"error":"Session expired, Login again to continue"})
    }

})

/* ------Get All Patients--------
---------------------------- */
router.post('/getAllPatients',async(req,res)=>{
    try{
        const token=await req.body.token;
        const payload=jwt.verify(await token,process.env.jwt_master_secret);
        if(!payload){
          return res.send({"error":"Could not verify"});
        }

        try{
          const doctordata =await admin.findOne({"_id":await payload.id,"name": await payload.name});
            if(doctordata) {
              const users = await user.find();

              for(let i = 0; i < users.length; i++){
                const userReports = await report.find({user_id:users._id})
                users[i]["reports"] = userReports.length;
              }

              return res.send({"success": "true","users":users});

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

        const payload=jwt.verify(await token,process.env.jwt_master_secret);
        if(!payload){
          return res.send({"error":"Could not verify"});
        }

        try{
          const admindata =await admin.findOne({"_id":await payload.id,"name": await payload.name});
            if(admindata) return res.send({"success":"Found user","name": admindata.name});
        }catch(err){
          return res.send({"error1":"Session expired, Login again to continue"})
        }
    }catch(err){
      return res.send({"error2":"Session expired, Login again to continue"})
    }
})

module.exports = router;
