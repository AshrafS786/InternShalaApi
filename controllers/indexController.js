exports.homepage = async (req, res, next) => {
    try {
        res.json({ message: "homepage" });

    } catch (error) {
        res.json(error)
    }
}
