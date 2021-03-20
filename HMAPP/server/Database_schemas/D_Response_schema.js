const mongoose= require('mongoose')

const Response= new mongoose.Schema({
    issue_id:{type:String,required:true},
    doctor_id:{type:String,required:true},
    doctor_name:{type:String,required:true},
    image:{type:String},
    message:{type:String,required:true},
    created:Date,
})

module.exports=mongoose.model('response',Response)
