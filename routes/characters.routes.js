const express = require('express')
const router = express.Router()
const User = require('../models/User.model')

const ApiService = require('./../services/api.service')
const { nextPage, prevPage } = require('./../utils/pages')
const { takeIdsArray, takeIdOneItem } = require('../utils/takeIdsUrl')

const charactersApi = new ApiService

router.post('/:id/add-favorites', (req, res, next) => {
    const { id } = req.params
    const user_id = req.session.currentUser._id
    User
        .findByIdAndUpdate(user_id, { $addToSet: { 'favorites.characters': id } })
        .then(() => res.redirect(`/characters/details/${id}`))
        .catch(err => next(err))
})

router.post('/:id/quit-favorites', (req, res, next) => {
    const { id } = req.params
    const user_id = req.session.currentUser._id
    User
        .findByIdAndUpdate(user_id, { $pull: { 'favorites.characters': id } })
        .then(() => res.redirect(`/characters/details/${id}`))
        .catch(err => next(err))
})

router.get('/results/:page', (req, res, next) => {
    let { name, species, status, gender } = req.query
    const { page } = req.params
    species ? species : species = ''
    name ? name : name = ''
    status ? status : status = ''
    gender ? gender : gender = ''
    charactersApi
        .getCharactersFilter(page, name, species, status, gender)
        .then(({ data }) => res.render('wiki/characters/results-characters', {
            characters: data.results,
            nextPage: nextPage(data, page),
            previousPage: prevPage(data, page),
            name, species, status, gender
        }))
        .catch(err => next(err))
})

router.get('/:page', (req, res, next) => {
    const { page } = req.params

    charactersApi
        .getAllCharacters(page)
        .then(({ data }) => res.render('wiki/characters/list-characters', {
            characters: data.results,
            nextPage: nextPage(data, page),
            previousPage: prevPage(data, page),
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