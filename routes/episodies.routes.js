const express = require('express')
const router = express.Router()
const { takeIdsArray } = require('../utils/takeIdsUrl')

const ApiService = require('./../services/api.service')
const { nextPage, prevPage } = require('./../utils/pages')

const episodiesApi = new ApiService

router.get('/:page', (req, res, next) => {
    const { page } = req.params
    episodiesApi
        .getAllEpisodies(page)
        .then(({ data }) => res.render('wiki/episodies/list-episodies', {
            episodies: data.results,
            nextPage: nextPage(data, page),
            previousPage: prevPage(data, page),
        }))
        .catch(err => next(err))
})

router.get('/details/:id', (req, res, next) => {
    const { id } = req.params
    episodiesApi
        .getEpisodeById(id)
        .then(({ data }) => {
            data.characters = takeIdsArray(data.characters, "character")
            res.render('wiki/episodies/details-episodies', { episode: data })
        })
        .catch(err => next(err))
})

module.exports = router