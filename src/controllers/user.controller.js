const soma = (req, res) => {
    const soma = 2 + 2;

    res.send({ soma: soma });
};

module.exports = { soma };
