const mongoose=require('mongoose');
var validator=require('validator');
var EmployeeSchema=new mongoose.Schema({
    firstname:{
        //required: true,
        type: String,
        minlength: 1,
        trim: true

    },
    lastname:{
        //required: true,
        type: String,
        minlength: 1,
        trim: true

    },
    email:{
        //required: true,
        type: String,
        minlength: 1,
        trim: true,
        //unique: true
        validate:{
            validator:validator.isEmail,
            message:'{Value} is not valid Email'
        }
    },
    state:{
        //required: true,
        type: String,
        minlength:1

    },
    city:{
        //required: true,
        type: String


    }


});
let employee=mongoose.model('employee',EmployeeSchema);

module.exports={employee};