const validateTaskFields = (req, res, next) => {
    const { title, status } = req.body;
    if (title === undefined && status === undefined) {
        return res.status(400).json({ error: 'No valid fields provided for update.' });
    }
    next();
};

module.exports = {
    validateTaskFields
};
