const mongoose=require('mongoose');
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost/testdb',(err,res)=>{
    console.log('test DB Connected....');
});