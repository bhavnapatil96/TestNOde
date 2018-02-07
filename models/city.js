const mongoose=require('mongoose');
var validator=require('validator');
var CitySchema=new mongoose.Schema({
    cityname:{
        //required: true,
        type: String,
        minlength: 1,
        trim: true
    },
    statename:{
        type:String
    }


});
let city=mongoose.model('city',CitySchema);

module.exports={city};