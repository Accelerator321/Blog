const express = require('express');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const { json } = require('express');
const app = express();
const port = 80;

var cookieParser = require('cookie-parser');

const blog = require('./models/blogSchema');
const signUp = require('./models/sigUpSchema')
const user = require('./routes/signedin')

app.use('/user', user)


// EXPRESS
app.use(cookieParser())
app.use('/static', express.static('static')); // serving static files
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));


// Connecting to Database
var userData;
function cookieChecker(req, res, next) {


    if (req.cookies) {
        userData = req.cookies.userData;
        next();
    }
    else {
        next();
    }
}

mongoose.connect('mongodb://localhost/harry');

var db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("We are connected")
});




// PUG
app.set('view engine', 'pug'); // set pug engine
app.set('views', path.join(__dirname, 'views')) // set view directory


// END POINT




app.get('/',cookieChecker, (req, res) => {
    res.status(200).render('home.pug')



}) 

app.post('/usercheck', (req, res) => {
    let obj = {
        username: req.body.username.toLowerCase()
    }

    signUp.find(obj, (err, item) => {
        if (err) {
         
        }

        else if (item.length !== 0) {
            res.send(JSON.stringify(true))
        }

        else {

            res.send(JSON.stringify(false))
        }
    })

})




app.listen(port, () => {
    console.log(`Server started at ${port}`)

});


app.get("/totalpage",(req,res)=>{
    blog.find().count().then(tblogs=>{
        if(tblogs <10){
        res.send(JSON.stringify(1))}
        else{
            res.send(JSON.stringify(tblogs%10==0?tblogs:parseInt(tblogs/10)+1))
        }
    })
})

app.get('/recentblogs', (req,res)=>{
    var page = Number(req.query.page)
    blog.find({}).then(blogs=>{
        res.send(JSON.stringify(blogs.reverse().slice( page*10 -10, page*10)));
        
    })

    
    
    


})



app.get('/getblogs',(req,res)=>{

    let getid  = `${req.query.getid}`;
 

    blog.find({getid}).then((item)=>{

        if(item.length){
        
        signUp.find({'username':item[0].username}).then((user)=>{
            item[0].avatar = user[0].avatar;
        res.status(201).render('blog.pug', {'blog':item[0]})})
  
        }
        else{
            res.status(500).send("Blog not Found")
        }  
    }).catch(()=>res.send("blog not found"))
})

app.get('/blogcontent',(req,res)=>{
    let getid  = `${req.query.getid}`;

    blog.find({getid}).then((item)=>{
        res.status(201).send(JSON.stringify(item[0]))})

})

app.get("/search",(req,res)=>{

  
    blog.find({"title": { "$regex": req.query.search, "$options": "i" }}).then(blogs=>{
        
        let obj = []
        let end=10;

        if(blogs.length<10){
            end=blogs.length;
        }
        for(let i=0; i<end;i++){
            obj.push({"image":[blogs[i].image[0]],"title":blogs[i].title, "username":blogs[i].username,"getid":blogs[i].getid})
        }
        res.send(JSON.stringify(obj))}

        )
})
app.get("/results",(req,res)=>{



        res.render('results.pug',{"query":req.query.search})
}
       
 
        )



