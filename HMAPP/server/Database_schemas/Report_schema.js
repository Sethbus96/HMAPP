const mongoose= require('mongoose')

const Report= new mongoose.Schema({
    subject:{type:String,required:true},
    issue:{type:String,required:true},
    image:{type:String},
    user_id:{type:String,required:true},
    created:Date,
})

module.exports=mongoose.model('report',Report)
