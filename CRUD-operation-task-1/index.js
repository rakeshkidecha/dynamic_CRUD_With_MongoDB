const express = require('express');
const path = require('path');
const db = require('./config/db')
const Emplloyee = require('./models/Employee')
const port = 8001;

const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.static(path.join(__dirname,'assets')));
app.use(express.urlencoded());

// view emplloyee data 
app.get('/',async (req,res)=>{
    const empData =  await Emplloyee.find();
    res.render('home',{empData});
})

// add amployee data 
app.post('/indertEmp',async (req,res)=>{
    console.log(req.body);
    await Emplloyee.create(req.body);
    res.redirect('back');
})

// delete Emplloyee 
app.get('/deleteEmp/:empId',async (req,res)=>{
    await Emplloyee.findByIdAndDelete(req.params.empId);
    return res.redirect('back');
})

// update Emplloyee data 
app.get('/updateEmp/:empId',async (req,res)=>{
    const singleEmp = await Emplloyee.findById(req.params.empId);
    return res.render('editEmp',{singleEmp});
})

app.post('/editEmp',async (req,res)=>{
    await Emplloyee.findByIdAndUpdate(req.body.empId,req.body);
    return res.redirect('/');
})

app.listen(port,err=>console.log(err?err:"Server run on http://localhost:"+port));
