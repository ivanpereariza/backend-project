const express = require('express')
const router = express.Router()

const ApiService = require('./../services/api.service')
const { nextPage, prevPage } = require('./../utils/pages')
const { takeIdsArray, takeIdOneItem } = require('../utils/takeIdsUrl')

const charactersApi = new ApiService


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