

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
    
  if(err===null&&doc!=null)
  {
      res.send({"msg":'user already exsited'})
  }
  else{
     bcrypt.hash(req.body.password,10,(err,hashedpw)=>{
         if(err) throw err;
         dbo.collection('registercollection').insertOne({name:req.body.name,password:hashedpw,dob:req.body.dob},(err,success)=>{
             if(err) throw err;
             res.send({"msg":"new user registred sucessfu;;y"});

         })

     })
  }
 
})

})
app.listen(3000);