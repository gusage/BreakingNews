import { createService, findAllService } from '../services/news.service.js';

const create = async (req, res) => {
    
    try {
        const {title, content, bannerImage} = req.body;

        if (!title || !content || !bannerImage) {
            return res.status(400).send({ message: 'Title, content and bannerImage are required.' });
        }

        await createService({
            title,
            content,
            bannerImage,
            user: 'objectId01'
        })

        res.send(201);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
    
}

const findAll = async (req, res) => {
    const news = await findAllService();
    if (news.length === 0) {
        return res.status(404).send({ message: 'No news found.' });
    }
    res.send(news);
}

export { create, findAll };