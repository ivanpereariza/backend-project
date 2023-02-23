const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('./../models/User.model')
const fileUploader = require('../config/cloudinary.config');
const saltRounds = 10
const { isLoggedIn, isLoggedOut } = require('./../middlewares/route-guards')

router.get("/signup", (req, res, next) => {
    res.render("auth/signup")
})

router.post('/signup', fileUploader.single('avatarUrl'), (req, res, next) => {

    const { email, username, description, dimension, password: planePassword } = req.body
    let avatarUrl = req.file?.path

    if (planePassword.length <= 4) {
        res.render('auth/signup', { errorMessage: 'The password should have 5 character minimun' })
        return
    } else if (username.length <= 2) {
        res.render('auth/signup', { errorMessage: 'The username should have 3 character minimun' })
        return
    }

    const promises = [User.findOne({ username }), User.findOne({ email })]

    Promise
        .all(promises)
        .then(([usernameResult, emailResult]) => {
            if (emailResult) {
                res.render('auth/signup', { errorMessage: 'The email have an account already in use' })
            } else if (usernameResult) {
                res.render('auth/signup', { errorMessage: 'The username is already in use, please chose another one' })
            }
        })
        .catch(err => next(err))

    bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(planePassword, salt))
        .then(hashPassword => User.create({ email, username, avatarUrl, description, dimension, password: hashPassword }))
        .then(() => res.redirect('/'))
        .catch(err => next(err))
})


router.get('/login', isLoggedOut, (req, res, next) => {

    res.render('auth/login')
})

router.post('/login', isLoggedOut, (req, res, next) => {

    const { username, password } = req.body

    if (username.length === 0 || password.length === 0) {
        res.render('auth/login', { errorMessage: 'Please fill all the fields' })
        return
    }

    User
        .findOne({ username })
        .then(user => {
            if (!user) {
                res.render('auth/login', { errorMessage: 'Unregistered User' })
            }

            else if (!bcrypt.compareSync(password, user.password)) {
                res.render('auth/login', { errorMessage: 'Incorrect Password' })
            }

            else {
                req.session.currentUser = user
                res.redirect('/')
            }
        })

})

router.get('/logout', isLoggedIn, (req, res, next) => {

    req.session.destroy(() => res.redirect('/'))
})

module.exports = router