const express = require('express')
const router = express.Router()

const User = require('./../models/User.model.js')
const Event = require('./../models/Event.model.js')

router.get('/users', (req, res, next) => {

    User
        .find()
        .select({ username: 1, email: 1, description: 1, role: 1, dimension: 1, favorites: 1 })
        .then(users => res.json(users))
        .catch(err => next(err))
})

router.get('/events', (req, res, next) => {

    Event
        .find()
        .then(events => res.json(events))
        .catch(err => next(err))
})

router.get('/events/:id', (req, res, next) => {

    const { id } = req.params

    Event
        .findById(id)
        .then(event => res.json(event))
        .catch(err => next(err))
})

module.exports = router