const express=require("express");
const mongoose=require("mongoose");


const app=express();

app.use(express.json({extended:false}));

// define routes
app.use('/',require('./routes/index'))
app.use('/api/url',require('./routes/url'));

mongoose.connect("mongodb://localhost:27017/urldb",{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{console.log("connected database")});

 



const port=5000;

app.listen(port,()=>{console.log(`server started on ${port}`)});