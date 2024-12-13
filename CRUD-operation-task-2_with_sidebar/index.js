const express = require('express');
const path = require('path');
const db = require('./config/db')
const User = require('./models/User');
const port = 8001;

const app = express();

app.set('view engine','ejs');
app.set("views",path.join(__dirname,'views'));

app.use(express.static(path.join(__dirname,'assets')));
app.use(express.urlencoded());

// view user data 
app.get('/', async (req,res)=>{
    const userData = await User.find();
    res.render('home',{userData});
})

// add user data 

app.post('/insertUser',async (req,res)=>{
    console.log(req.body);
    await User.create(req.body);
    return res.redirect('/');
})

// delete user data 
app.get('/deleteUser/:uId',async (req,res)=>{
    await User.findByIdAndDelete(req.params.uId);
    return res.redirect('back');
})

// update user data 
app.get('/upadateUser/:uId', async (req,res)=>{
    let singleUser = await User.findById(req.params.uId);
    console.log(singleUser);
    return res.render('edit',{singleUser});
})

app.post('/editUser',async (req,res)=>{
    await User.findByIdAndUpdate(req.body.uId,req.body);
    return res.redirect('/');
})



app.listen(port,err=>console.log(err?err:"Server run on http://localhost:"+port));