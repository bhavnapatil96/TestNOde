const express=require('express');
const bodyParser=require('body-parser');
const _=require('lodash');
var conn=require('./config/conn');
const employee=require('./models/employee').employee;
const state=require('./models/state').state;
const city=require('./models/city').city;

var app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.use((req,res,next) =>{

    res.header('Access-Control-Allow-Origin',' http://localhost:3002');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();
});
app.get('/list',(req,res)=>{
    employee.find({flag:true}).then((data)=>{
        if(!data){
            console.log(`Data Not found`);
        }
        res.send(data);
    }).catch((e)=>{
        console.log(`Error : ${e.message}`);
    })
});
app.get('/sort',(req,res)=>{
   // let key=req.body.key;
    employee.find().sort({"firstname": 1}).exec(function(err,docs){
        if (err) throw err;
        res.send(docs);
    })

});
app.get('/dsort',(req,res)=>{

    employee.find().sort({"firstname": -1}).exec(function(err,docs){
        if (err) throw err;
        res.send(docs);
    })

});
app.post('/add',(req,res)=>{
    console.log(req.body.firstname);
    var newEmp=new employee({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        state:req.body.state,
        city:req.body.city
    });

    newEmp.save().then((data)=>{
        console.log('Data = ',data);
        res.send(data);
    }).catch((e)=>{

        console.log(e.message);
    });


});
app.post('/delete',(req,res)=>{
    let id=req.body.id;
    console.log(id);
    employee.findByIdAndUpdate(id,{$set:{flag:false}}).then((emp)=>{
        if (!emp) {
            res.status(404).send();
        }
        res.send(emp);
    }).catch ((e)=>{
        console.log(`error : ${e.message}`);
        res.status(404).send();
    })
});

app.post('/update',(req,res)=>{
    let body=_.pick(req.body,['firstname','lastname','email','state','city']);
    //let id=body.id;
    console.log('request Id : ',req.body.id);
    employee.findByIdAndUpdate(req.body.id,{$set:body}).then((emp)=>{
        if(!emp){
            console.log(req.body.id,`Id Not Found`);
            res.status(404).send();
        }
        res.send(emp);
    }).catch((e)=>{
        console.log(`Error : ${e.message}`);
    });
});

app.post('/addState',(req,res)=>{
    console.log(req.body.statename);
    var newState=new state({
        statename:req.body.statename

    });

    newState.save().then((data)=>{
        console.log('Data = ',data);
        res.send("Inserted.....");
    }).catch((e)=>{

        console.log(e.message);
    });


});
app.post('/addCity',(req,res)=>{
    console.log(req.body.statename);
    var newCity=new city({
        cityname:req.body.cityname,
        statename:req.body.statename

    });

    newCity.save().then((data)=>{
        console.log('Data = ',data);
        res.send("Inserted.....");
    }).catch((e)=>{

        console.log(e.message);
    });


});
app.get('/statelist',(req,res)=>{
    state.find().then((data)=>{
        if(!data){
            console.log(`Data Not found`);
        }
        res.send(data);
    }).catch((e)=>{
        console.log(`Error : ${e.message}`);
    })
});
app.get('/citylist',(req,res)=>{
    city.find().then((data)=>{
        if(!data){
            console.log(`Data Not found`);
        }
        res.send(data);
    }).catch((e)=>{
        console.log(`Error : ${e.message}`);
    })
});
app.post('/findbystate',(req,res)=>{
    let statename=req.body.statename;

    city.find({statename:statename}).then((city)=>{
        if(!city)
        {
            console.log(`${statename} Id Not Found `);
            res.status(404).send();
        }

        res.send(city);
    }).catch((e)=>{
        console.log(`Error : ${e.message}`);
        res.status(404).send();
    });
});
app.post('/mypage',(req,res)=>{

    var no=req.body.no;
    var Recordsperpage=req.body.records;

    if(no==1)
    {
        employee.find().limit(Recordsperpage).then((data)=>{
            if(!data){
                console.log(`Data Not found`);
            }
            res.send(data);
        }).catch((e)=>{
            console.log(`Error : ${e.message}`);
        })
    }
    else
    {
        employee.find().limit(Recordsperpage).skip(Recordsperpage*(no-1)).then((data)=>{
            if(!data){
                console.log(`Data Not found`);
            }
            res.send(data);
        }).catch((e)=>{
            console.log(`Error : ${e.message}`);
        })
    }

    if(req.body.no==1)
    {

    }
    if(req.body.no==2)
    {

    }

});


app.listen(8282);
