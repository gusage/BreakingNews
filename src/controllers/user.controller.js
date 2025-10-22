const mongoose = require('mongoose');
const { find } = require('../models/User');
const userService = require('../services/user.service');

const create = async (req, res) => {
    const { name, username, email, password, avatar, background } = req.body;

    if (!name || !username || !email || !password || !avatar || !background) {
        res.status(400).send({ message: 'All fields are required' });
    }

    const user = await userService.createService(req.body);

    if (!user) {
        return res.status(400).send({ message: 'Error creating user' });
    }
    res.status(201).send({ message: 'User created successfully' });
};

const findAll = async (req, res) => {
    const users = await userService.findAllService();

    if (users === 0) {
        return res.status(400).send({ message: 'No users found' });
    }

    res.send(users);
}

const findById = async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send({ message: 'Invalid ID' });
    }

    const user = await userService.findByIdService(id)
    if (!user) {
        return res.status(404).send({ message: 'User not found' });
    }
    res.send(user);
}
module.exports = { create, findAll, findById };
