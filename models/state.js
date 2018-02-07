const mongoose=require('mongoose');
var validator=require('validator');
var StateSchema=new mongoose.Schema({
    statename:{
        //required: true,
        type: String,
        minlength: 1,
        trim: true
    }


});
let state=mongoose.model('state',StateSchema);

module.exports={state};