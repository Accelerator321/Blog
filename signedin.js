const express = require('express');
let router = express.Router();
const app = express();
var cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const signUp = require('../models/sigUpSchema');
const blog = require('../models/blogSchema');


router.use('/static', express.static('static'));

router.use(cookieParser("Rasengan1278uploaded"));
router.use(express.json());
router.use(express.urlencoded({
    extended: false
}));

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

    if (req.signedCookies) {
        userData = req.signedCookies.userData;

        if (!userData) {
            res.clearCookie('userData');
        }
        next();
    }
    else {
        next();
    }

}

router
    .route('/')
    .get(cookieChecker, (req, res) => {
    
        

        if(req.query.username){
            let username = req.query.username;
            signUp.find({username}).then((items)=>{res.status(201).render("profile.pug", {user:items[0]})})
            
        }

        else if (userData) {
            res.status(200).send(JSON.stringify(userData));
        }
        else {
            res.status(500).send(JSON.stringify(false));
        }
    })


router
    .route('/signup')
    .get((req, res) => {
        res.status(200).render('signup.pug')
    })


router.post('/signup', upload.single('profilePic'), cookieChecker, (req, res) => {


    let obj = {
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        // avatar: path.join('/static/img/', `${req.file.filename}`)
    }

    user = new signUp(obj)

    user.save().then(() => {

    
            item.save();
            if (userData) {
                res.clearCookie('userData');

            }
            res.cookie('userData', { username: item.username, email: item.email, avatar: item.avatar }, { httpOnly: true, signed: true, maxAge: 365 * 24 * 12 * 60 * 60 * 1000 });


            // New User Route

            router.get(`/${item.username}`, cookieChecker, (req, res) => {

                if (userData) {
                    res.status(200).render('signuptemplate.pug', { user: item })
                }
                else {
                    res.status(500).send('Please Login First')
                }
            })
            res.redirect(`/user/${item.username}`);

        }).catch(()=>{res.render('signup.pug', {msg:'Email Alraedy Registered'})
    })})






router
    .route('/signin')

    .get(cookieChecker, (req, res) => {


        if (userData) {
            res.status(200).redirect(`/user/${userData.username}`)

        }

        else {
            res.status(200).render('signin.pug')
        }
    })
    .post((req, res) => {


        let userData = {
            email: req.body.email,
            password: req.body.password,
        }
        signUp.find({ 'email': userData.email, 'password': userData.password }).then((items) => {
            if (items.length !== 0) {
                res.cookie('userData', { username: items[0].username, email: items[0].email, avatar: items[0].avatar }, { maxAge: 365 * 24 * 12 * 60 * 60 * 1000, httpOnly: true, signed: true })
                res.status(200).redirect(`/user/${items[0].username}`)


            }
            else {
                res.send(' user not found')

            }
        })

    })


router
    .route('/logout')
    .get((req, res) => {
        res.clearCookie('userData')
        res.redirect('/')
    })



// ___________________Creat Blog End Point_______________

router
    .route(`/newblog`)
    .get(cookieChecker, (req, res) => {

        if (userData) {
            res.status(200).render('newblog.pug')
        }
        else {
            res.status(500).send('Please Login First')
        }
    })



    .post(cookieChecker, upload.array('image'), (req, res) => {
        let images = []
        
        for(item of req.files){
            images.push(path.join('static/img/', `${item.filename}`))
        }
        let obj = {
            "username": userData.username,
            "title": req.body.title,
            "heading": req.body.heading,
            "image": images,
            "text": req.body.text,
            "pattern": req.body.pattern,
            "getid": `${req.body.title.split("-").join("").split(/\s+/).join("-")}-${userData.username}${Date.now()}`
        }

        if (userData) {
            let blogData = new blog(obj)

            blogData.save().then(() => {
                res.redirect(`/user/${userData.username}`)
            }
            )

        }
    })


router
    .route('/blogs')
    .get(cookieChecker, (req, res) => {
        
        if(req.query.username){
            console.log(req.query)
            blog.find({ username: req.query.username }).then(items => {

                res.send(JSON.stringify({ blogs: items }))
            })
        }
        else if (userData) {
            blog.find({ username: userData.username }).then(items => {

                res.send(JSON.stringify({ blogs: items }))
            })
        }
        
    }
    )


router
    .route('/deleteblog')
    .delete(cookieChecker, (req, res) => {
      

        if (userData) {
            blog.find({ "getid": req.body.getid }).then((blogs) => {
              
                if (blogs[0].username === userData.username) {
                    blog.deleteOne({ getid: req.body.getid }).then(()=>res.send('success'))


                }
            })
        }
    })




signUp.find({}).then(items => {
    for (let item of items) {
        router
            .route(`/${item.username}`)
            .get(cookieChecker, (req, res) => {
                if (userData) {
                    if (userData.username === item.username) {
                        res.status(200).render('signuptemplate.pug', { user: item })
                    } else { res.redirect('/') }
                }
                else { res.redirect('/') }
            })
    }
}
)
module.exports = router;
