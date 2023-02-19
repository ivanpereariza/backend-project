const express = require('express')
const router = express.Router()
const User = require('./../models/User.model')

router.get("/", (req, res, next) => {
  res.render("index")
})

router.get('/community', (req, res, next) => {
  User
    .find()
    .then(users => res.render('user/all-users', { users }))
    .catch(err => next(err))
})

module.exports = router
