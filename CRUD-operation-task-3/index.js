const express = require('express');
const path = require('path');
const db = require('./config/db')
const ProductReview = require('./models/ProductReview');
const port = 8001;

const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))

app.use(express.static(path.join(__dirname,'assets')));
app.use(express.urlencoded());

// view review 
app.get('/',async (req,res)=>{
    const productReviewData = await ProductReview.find();
    res.render('home',{productReviewData})
})

// add review 
app.post('/inserProductReview',async (req,res)=>{
    console.log(req.body);
    await ProductReview.create(req.body);
    return res.redirect('back');
})

// delete review 
app.get('/deleteReview/:rId',async(req,res)=>{
    await ProductReview.findByIdAndDelete(req.params.rId);
    return res.redirect('back');
})

// update review 
app.get('/updateReview/:rId',async(req,res)=>{
    let singleReview = await ProductReview.findById(req.params.rId);
    return res.render('edit',{singleReview});
})

app.post('/editReview',async(req,res)=>{
    await ProductReview.findByIdAndUpdate(req.body.rId,req.body);
    return res.redirect('/');
})

app.listen(port,err=>console.log(err?err:"Server run on http://localhost:"+port));