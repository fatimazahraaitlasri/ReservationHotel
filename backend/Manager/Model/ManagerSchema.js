const mongoose = require('mongoose')
const ManagerSchema = mongoose.Schema({
   
    matricule:{
        type:String,
        required:[true,"Please add a email field"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Please add a password field"]
    },
    quantity:{
        type:Number,
        required:[true,"Please add a password field"]
    },
    Type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Type',
        required: true,
      },
    
})
module.exports = mongoose.model("Manager",ManagerSchema)