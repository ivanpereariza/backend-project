const express = require('express')
const router = express.Router()
const User = require('./../models/User.model')
const { isLoggedIn } = require('./../middlewares/route-guards')


router.get("/", (req, res, next) => {
  res.render("index")
})

router.get('/community', isLoggedIn, (req, res, next) => {
  User
    .find()
    .select({ username: 1, avatarUrl: 1, dimension: 1 })
    .sort({ username: 1 })
    .then(users => res.render('user/all-users', { users }))
    .catch(err => next(err))
})

module.exports = router
