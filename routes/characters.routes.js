const express = require('express')
const router = express.Router()
const User = require('../models/User.model')
const ApiService = require('./../services/api.service')
const { takeIdsArray, takeIdOneItem } = require('../utils/takeIdsUrl')
const { blockPages } = require('./../utils/blockPages')
const charactersApi = new ApiService()

router.post('/:id/add-favorites', (req, res, next) => {

    const { id } = req.params
    const { _id: user_id } = req.session.currentUser

    User
        .findByIdAndUpdate(user_id, { $addToSet: { 'favorites.characters': id } })
        .then(() => res.redirect(`/characters/details/${id}`))
        .catch(err => next(err))
})

router.post('/:id/quit-favorites', (req, res, next) => {

    const { id } = req.params
    const { _id: user_id } = req.session.currentUser

    User
        .findByIdAndUpdate(user_id, { $pull: { 'favorites.characters': id } })
        .then(() => res.redirect(`/characters/details/${id}`))
        .catch(err => next(err))
})

router.get('/results/:page', (req, res, next) => {

    let { name, species, status, gender } = req.query
    const { page } = req.params

    species = species || ''
    name = name || ''
    status = status || ''
    gender = gender || ''

    charactersApi
        .getCharactersFilter(page, name, species, status, gender)
        .then(({ data }) => res.render('wiki/characters/results-characters', {
            characters: blockPages(data, page),
            name, species, status, gender
        }))
        .catch(err => {
            console.log(err)
            res.redirect('/characters/1?errorMessage=Dont find anything')
        })
})

router.get('/:page', (req, res, next) => {

    const { page } = req.params
    const { errorMessage } = req.query

    charactersApi
        .getAllCharacters(page)
        .then(({ data }) => res.render('wiki/characters/list-characters', {
            characters: blockPages(data, page),
            errorMessage
        }))
        .catch(err => next(err))
})



router.get('/details/:id', (req, res, next) => {

    const { id } = req.params

    charactersApi
        .getCharacterById(id)
        .then(({ data }) => {
            data.origin.url = takeIdOneItem(data.origin.url, "location")
            data.location.url = takeIdOneItem(data.location.url, "location")
            data.episode = takeIdsArray(data.episode, "episode")
            res.render('wiki/characters/details-characters', { character: data })
        })
        .catch(err => next(err))
})

module.exports = router