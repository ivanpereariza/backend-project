const express = require('express')
const router = express.Router()

const User = require('./../models/User.model.js')
const Event = require('./../models/Event.model.js')

router.get('/users', (req, res, next) => {
    User
        .find()
        .then(users => res.json(users))
        .catch(err => next(err))
})

router.get('/events', (req, res, next) => {
    Event
        .find()
        .then(events => res.json(events))
        .catch(err => next(err))
})

module.exports = router