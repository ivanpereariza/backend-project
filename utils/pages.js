function nextPage(data, page) {
    let nextPage = page < data.info.pages ? Number(page) + 1 : undefined
    return nextPage
}

function prevPage(data, page) {
    let previousPage = page > 1 ? Number(page) - 1 : undefined
    return previousPage
}

module.exports = { nextPage, prevPage }