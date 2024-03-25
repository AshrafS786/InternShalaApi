const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");

exports.homepage = catchAsyncErrors(async (req, res, next) => {
    try {
        res.json({ message: "homepage" });

    } catch (error) {
        res.json(error)
    }
})
