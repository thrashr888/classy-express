module.exports = {
    index: function (req, res) {
        return {
            text: 'Hello World!',
            method: req.method
        }
    },

    id: function (req, res, id) {
        // console.log('req', req.url, req.params, req.parse, req.query)
        return {
            text: 'User ' + (id ? id : 'not found'),
            method: req.method
        }
    }
}