
const create = (req, res) => {
    const {name, username, email, password, avatar, background} = req.body;

    if (!name || !username || !email || !password || !avatar || !background) {
        res.status(400).send({message: 'All fields are required'});
    }
    res.status(201).send({message: 'User created successfully'});
}

module.exports = { create };
