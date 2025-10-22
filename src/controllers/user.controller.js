const userService = require('../services/user.service');

const create = async (req, res) => {
    const { name, username, email, password, avatar, background } = req.body;

    if (!name || !username || !email || !password || !avatar || !background) {
        res.status(400).send({ message: 'All fields are required' });
    }

    const user = await userService.create(req.body);

    if (!user) {
        return res.status(400).send({ message: 'Error creating user' });
    }
    res.status(201).send({ message: 'User created successfully' });
};

module.exports = { create };
