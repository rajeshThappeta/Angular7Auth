var exp=require('express');
var app=exp();
var path=require('path');
var mongodb=require('mongodb').MongoClient;
var bodyParser=require('body-parser');
var bcrypt=require('bcrypt');
app.use(bodyParser.json());
app.use(exp.static(path.join(__dirname,'dist/Angular7Auth')));

var dbo;
mongodb.connect('mongodb://rajesh:razesh1979@ds121118.mlab.com:21118/angular7authdb',(err,db)=>{
    if(err) throw err;
    dbo=db.db("angular7authdb");

})


app.post('/register',(req,res)=>{
//check for existence of uasername id DB already
dbo.collection('registercollection').findOne({name:req.body.name},(err,doc)=>{

    console.log('doc is '+doc)
    console.log('err is '+err)
    if(!err){
        res.send({"msg":"usernaem already exists"})
    }
    bcrypt.hash(req.body.password,10,(err,hashedPw)=>{
        if(err) throw err;
        dbo.collection('registercollection').insertOne({name:req.body.name,password:hashedPw,dob:req.body.dob},(err,doc)=>{
            if(err) throw err;
            res.send({"msg":"registered successfully"});
        })
    })
 
})

})
app.listen(3000);