const express=require('express');
const app=express();
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
const MongoClient=require('Mongodb').MongoClient;
const url='mongodb://127.0.0.1:27017';
const dbname="hospitalManagement";
let db;
MongoClient.connect(url,(err,client)=>{
    if(err) return console.log(err);
    db=client.db(dbname);
    console.log(`connected database: ${url}`);
    console.log(`Database:${dbname}`);
});
let server=require('./server');
let config=require('./config');
let middleware=require('./middleware');
const response=require('express');
app.get('/Hospital',middleware.checkToken,(req,res)=>{
    let solution;
    console.log("fetching hospital details");
    const data=db.collection("Hospital").find().toArray().then(result=>res.send(result));
});
app.get('/Hospital',middleware.checkToken,(req,res)=>{
    const name=req.query.name;
    console.log("fetching hospital details");
    const data=db.collection("Hospital").find({"name":name}).toArray().then(result=>res.send(result));
});
app.get('/Ventilator',(req,res)=>{
    console.log("fetching ventilator details");
    const data=db.collection("Ventilators").find().toArray().then(result=>(res.send(result)));
});
app.post('/addventilator',(req,res)=>{
    const name=req.query.name;
    const hId=req.query.hId;
    const ventilatorId=req.query.ventilatorId;
    const status="not occupied";
    console.log("adding ventilator");
    db.collection("Ventilators").insertOne({"name":name,"hId":hId,"ventilatorId":ventilatorId,"status":status});
    res.send("adding ventilator is done..");
});
app.delete('/deleteventilator',middleware.checkToken,(req,res)=>{
    const ventilatorId=req.query.ventilatorId;
    console.log("deleting ventilator");
    db.collection("Ventilators").deleteOne({"ventilatorId":ventilatorId});
    res.send("deleting ventilator is done..");
});
app.put('/updateVentilator',middleware.checkToken,(req,res)=>{
    const ventilatorId=req.query.ventilatorId;
    const status=req.query.status;
    console.log("dupdating ventilator details");
    db.collection("Ventilators").updateOne({"ventilatorId":ventilatorId},{$set:{"status":status}});
    console.log("updated successufully");
    res.send("updation successful");
});
app.post('/searchventilatorsbystatus',(req,res)=>{
    const status=req.query.status;
    console.log(status);
    var ventilatordetails=db.collection("Ventilators").find({"status":status}).toArray().then(result=>res.json(result));
});
app.post('/searchventilatorsbyname',(req,res)=>{
    // const status=req.query.status;
    // const name=req.query.name;
    var name=req.query.name;
    console.log("searching ventilators");
    var ventilatordetails=db.collection("Ventilators").find({"name":new RegExp(name,'i')}).toArray().then(function(result){
        if(result.length==0)
        res.send("not found any");
        else
        res.send(result);}
    )
    });
app.listen(3000,(req,res)=>{
    console.log("listening..");
});