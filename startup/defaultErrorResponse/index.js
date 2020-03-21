module.exports = function (res, statusCode, successNote, errorMessage) {

    return res.status(statusCode).json({ success: successNote, data: errorMessage })
}