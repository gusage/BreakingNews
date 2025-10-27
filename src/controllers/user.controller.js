import mongoose from 'mongoose';
import User from '../models/User.js';
import userService from '../services/user.service.js';

const create = async (req, res) => {
    try {
        const { name, username, email, password, avatar, background } = req.body;

        if (!name || !username || !email || !password || !avatar || !background) {
            res.status(400).send({ message: 'All fields are required' });
        }

        const user = await userService.createService(req.body);

        if (!user) {
            return res.status(400).send({ message: 'Error creating user' });
        }
        res.status(201).send({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    };
}

const findAll = async (req, res) => {
    try {
        const users = await userService.findAllService();

        if (users === 0) {
            return res.status(400).send({ message: 'No users found' });
        }
        res.send(users);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const findById = async (req, res) => {
    try {
        const { id, user } = req;

        res.send(user);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const update = async (req, res) => {
    try {
        const { name, username, email, password, avatar, background } = req.body;

        if (!name && !username && !email && !password && !avatar && !background) {
            res.status(400).send({ message: 'At least one field is required' });
        }

        const { id, user } = req;

        await userService.updateService(
            id,
            name,
            username,
            email,
            password,
            avatar,
            background
        );

        res.send({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export { create, findAll, findById, update };
