const Errors = {}

Errors.errorBaseCatcher = function (error, req, res, next) {
    res.status(500).json({
        status: 'Something went wrong on models query.',
        data: error.ReferenceError
    })
}

Errors.catchAsyncErrors = function (handler) {

    return async (req, res, next) => {

        try {
            await handler(req, res)

        } catch (error) {
            next(error)
        }

    }
}


module.exports = Errors