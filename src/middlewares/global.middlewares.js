const mongoose = require('mongoose');
const userService = require('../services/user.service');

const validId = (req, res, next) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send({ message: 'Invalid ID' });
    }

    next();
}

const validUser = (req, res, next) => {
    const id = req.params.id;

    const user = userService.findByIdService(id);

    if (!user) {
        return res.status(404).send({ message: 'User not found' });
    }

    req.id = id;
    req.user = user;

    next();
}

module.exports = {
    validId,
    validUser
};
