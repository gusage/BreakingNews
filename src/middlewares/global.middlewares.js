import mongoose from 'mongoose';
import userService from '../services/user.service.js';

const validId = (req, res, next) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send({ message: 'Invalid ID' });
        }

        next();
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const validUser = (req, res, next) => {
    try {
        const id = req.params.id;

        const user = userService.findByIdService(id);

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        req.id = id;
        req.user = user;

        next();
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export default {
    validId,
    validUser
};
