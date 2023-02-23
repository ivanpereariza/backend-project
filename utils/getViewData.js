const { nextPage, prevPage } = require('./pages')

function getViewData(data, page) {
    return {
        info: data.results,
        nextPage: nextPage(data, page),
        previousPage: prevPage(data, page)
    }
}


module.exports = { getViewData }