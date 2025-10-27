import { createService, findAllService, countNews, topNewsService } from '../services/news.service.js';

const create = async (req, res) => {

    try {
        const { title, content, bannerImage } = req.body;

        if (!title || !content || !bannerImage) {
            return res.status(400).send({ message: 'Title, content and bannerImage are required.' });
        }

        await createService({
            title,
            content,
            bannerImage,
            user: req.userId,
        })

        res.send(201);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }

}

const findAll = async (req, res) => {
    try {
        let { limit, offset } = req.query;

        limit = Number(limit);
        offset = Number(offset);

        if (!limit) {
            limit = 5;
        }

        if (!offset) {
            offset = 0;
        }

        const news = await findAllService(offset, limit);
        const total = await countNews();
        const currentUrl = req.baseUrl;

        const next = offset + limit;
        const nextUrl = next < total ? '${ currentUrl }?limit = ${ limit }& offset=${ next }' : null;

        const previous = offset - limit < 0 ? null : offset - limit;
        const previousUrl = previous !== null ? '${ currentUrl }?limit=${ limit }&offset=${ previous }' : null;

        if (news.length === 0) {
            return res.status(404).send({ message: 'No news found.' });
        }
        res.send({
            nextUrl,
            previousUrl,
            limit,
            offset,
            total,
            results: news.map((newsItem) => ({
                id: newsItem._id,
                title: newsItem.title,
                content: newsItem.content,
                bannerImage: newsItem.bannerImage,
                createdAt: newsItem.createdAt,
                likes: newsItem.likes,
                comments: newsItem.comments,
                userName: newsItem.user.name,
                userAvatar: newsItem.user.avatar,
            })),
        })
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const topNews = async (req, res) => {
    try {
        const news = await topNewsService();

        if (!news) {
            return res.status(404).send({ message: 'No news found.' });
        }

        res.send({
            news: {
                id: news._id,
                title: news.title,
                content: news.content,
                bannerImage: news.bannerImage,
                createdAt: news.createdAt,
                likes: news.likes,
                comments: news.comments,
                userName: news.user.name,
                userAvatar: news.user.avatar,
            }
        })
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export { create, findAll, topNews };
