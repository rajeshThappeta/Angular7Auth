
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
app.post('/login',(req,res)=>{
    console.log(req.body);
    dbo.collection('registercollection').findOne({name:req.body.name},(err,user)=>{
        console.log('user'+JSON.stringify(user));
        console.log('err'+err)
        //if no matching found,findOne() returns null
        if(user===null) 
        {
           res.send({"msg":"invalid user name"})
        }
        if(user!==null){
      bcrypt.compare(req.body.password,user.password,(err,success)=>{
          if(err) throw err;
          if(!success)
          {
        res.json('wrong pasword')  
          }
          res.json({"msg":"user exited"})
        })
    }
    })
})
app.listen(3000);