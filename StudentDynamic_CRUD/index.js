const express = require('express');
const path = require('path');
const db = require('./config/db');
const Student = require('./models/Student');
const port = 8002;

const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.static(path.join(__dirname,'assets')));

app.use(express.urlencoded());


// view student data on home page 
app.get('/', async (req,res)=>{
    const studentData = await Student.find();
    res.render('home',{studentData});
})

// add student 
app.get('/form',(req,res)=>{
    res.render('form');
})

app.post('/insertStudent',async(req,res)=>{
    await Student.create(req.body);
    return res.redirect('/');
})

// delet student 
app.get('/deleteStudent/:stId',async (req,res)=>{
    await Student.findByIdAndDelete(req.params.stId);
    return res.redirect('back');
})


// update student data 

app.get('/updateStudent/:stId',async (req,res)=>{
    let singleStudent = await Student.findById(req.params.stId);
    return res.render('edit',{singleStudent});
})

app.post('/editStudent', async (req,res)=>{
    await Student.findByIdAndUpdate(req.body.stId,req.body);
    return res.redirect('/');
})

app.listen(port,err=>console.log(err?err:"Server run on http://localhost:"+port));