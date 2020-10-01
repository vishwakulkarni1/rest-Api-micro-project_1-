var express= require('express');
var app=express();
const MongoClient=require('mongodb').MongoClient;
const url='mongodb://127.0.0.1:27017';
const dbName='database1';
let db;
MongoClient.connect(url, (err,client)=>{
    if(err) return console.log(err);
    db=client.db(dbName);
    console.log(`Connected Database: ${url}`);
    console.log(`Database : ${dbName}`);
    // db.collection('c1').find({'name':'rohith'})
});

app.get('/name',(req,res)=>{
    db.collection('c1').find().toArray().then(result=>res.json(result));
});
app.listen(3000);



// var express=require('express');
// var app=express();

// app.get('/',(req,res)=>{
//     res.send('hello world');
// });

// app.get('/home/:name',(req,res)=>{
//     var name=req.params.name;
//     res.send(`you are at page no ${name}`);
// });
// app.listen(3000);