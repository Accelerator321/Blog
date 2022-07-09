const express = require('express');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const { json } = require('express');
const app = express();
const port = 80;
const multer = require('multer')
var cookieParser = require('cookie-parser')
// const users = require('./routes/users')

// app.use('/users', users)


// EXPRESS
app.use(cookieParser())
app.use('/static', express.static('static')); // serving static files
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));





// Connecting to Database

mongoose.connect('mongodb://localhost/harry');

var db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("We are connected")
});


// Making Schema
const signUpSchema = new mongoose.Schema({
    email: String,
    password: String,
    username: String,
    avatar: String,
});

const signUp = mongoose.model('signUp', signUpSchema);

// ______Blog Post Schema_______
const blogPost = new mongoose.Schema({
    username: String,
    title: String,
    image: String,
    text: Array,
    heading:Array,
    pattern: String,
    url: String

});

const blog = mongoose.model('blog', blogPost);


//_________________________ MULTER________________________________

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'static/img')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
});

var upload = multer({ storage: storage });



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


// PUG
app.set('view engine', 'pug'); // set pug engine
app.set('views', path.join(__dirname, 'views')) // set view directory


// END POINT



app.get('/user', cookieChecker, (req, res) => {
    if (userData) {
        res.status(200).send(JSON.stringify(userData));
    }
    else {
        res.status(500).send(JSON.stringify(false));
    }
})
app.get('/', cookieChecker, (req, res) => {
    res.status(200).render('home.pug', { user: userData })



}) // ________________________Sign Up End Point_____________________
app.get('/signup', (req, res) => {
    res.status(200).render('signup.pug')
})


app.post('/usercheck', (req, res) => {
    let obj = {
        username: req.body.username
    }

    signUp.find(obj, (err, item) => {
        if (err) {
            console.log(err)
        }

        else if (item.length !== 0) {
            res.send(JSON.stringify(true))
        }

        else {

            res.send(JSON.stringify(false))
        }
    })

})

//  Singup form posting
app.post('/signup/upload', upload.single('profilePic'), cookieChecker, (req, res) => {

    let obj = {
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        avatar: path.join('static/img/', `${req.file.filename}`)
    }


    signUp.find({ 'email': obj.email }, (err, items) => {
        if (err) {
            res.status(500).send('An error occurred', err);
        }
        else if (items.length === 0) {
            signUp.create(obj, (err, item) => {

                if (err) {
                    res.status(500).send('An error occurred', err);
                }
                else {
                    item.save();
                    if (userData) {
                        res.clearCookie('userData');

                    }
                    res.cookie('userData', { username: item.username, email: item.email, avatar: item.avatar });

                    app.get(`/${item.username}`, cookieChecker, (req, res) => {

                        if (userData) {
                            res.status(200).render('signuptemplate.pug', { user: item })
                        }
                        else {
                            res.status(500).send('Please Login First')
                        }
                    })
                    res.redirect(`/${item.username}`);

                }
            })
        }

        else {
            res.send('User already Exists')
        }

    })
})


// ________________________Sign In End Point_____________________
app.get('/signin', cookieChecker, (req, res, next) => {


    if (userData) {
        res.status(200).redirect(`/${userData.username}`)

    }

    else {
        res.status(200).render('signin.pug')
    }
})
app.post('/signin', (req, res) => {
    let userData = {
        email: req.body.email,
        password: req.body.password,
    }
    signUp.find({ 'email': userData.email, 'password': userData.password }, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else if (items.length !== 0) {
            res.cookie('userData', { username: items[0].username, email: items[0].email, avatar: items[0].avatar }, { maxAge: 365 * 24 * 12 * 60 * 60 * 1000 })
            res.status(200).redirect(`/${items[0].username}`)


        }
        else {
            res.send('not found')

        }
    })

})


// ________________Log Out Route______________

app.get('/logout', (req, res) => {
    res.clearCookie('userData')
    res.redirect('/')
})



// ___________________Creat Blog End Point_______________

app.get(`/users/newblog`, cookieChecker, (req, res) => {

    if (userData) {
        res.status(200).render('newblog.pug')
    }
    else {
        res.status(500).send('Please Login First')
    }
})



app.post(`/users/newblog`, cookieChecker, upload.single('image'), (req, res) => {
    let obj = {
        "username": userData.username,
        "title": req.body.title,
        "heading":req.body.heading,
        "image": path.join('static/img/', `${req.file.filename}`),
        "text": req.body.text,
        "pattern":req.body.pattern,
        "url": `/${req.body.title.split(' ').join('-')}:${userData.username}${Date.now()}`
    }
    console.log(obj)
    if (userData) {
        let blogData = new blog(obj)

        blogData.save().then(() => {
            console.log('end point')
            console.log(obj.url);
            app.get(`${obj.url}`,(req,res)=>{
                
                res.render('blog.pug', {blog:obj})
            });
            res.redirect(`/${userData.username}`)
        }
        )

    }
})



app.listen(port, () => {
    console.log(`Server started at ${port}`)

});

app.get('/blogs', cookieChecker, (req, res) => {
    if (userData) {
        blog.find({ username: userData.username }).then(items => {
            res.send(JSON.stringify({ blogs: items }))
        })
    }
}
)

signUp.find({}).then(items => {
    for (let item of items) {
        app.get(`/${item.username}`, cookieChecker, (req, res) => {
            if (userData) {
                if (userData.username === item.username) {
                    res.status(200).render('signuptemplate.pug', { user: item })
                } else { res.redirect('/') }
            }
        })
    }
}
)

blog.find({}).then(blogs=>{
    for(let blog of blogs){
        app.get(`${blog.url}`, (req,res)=>{
            res.status(201).render('blog.pug', {blog})
        })
        app.post(`${blog.url}`, (req,res)=>{

            res.status(201).send(JSON.stringify(blog))
        })
    }
})





