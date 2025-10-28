import {
    createService,
    findAllService,
    countNews,
    topNewsService,
    findByIdService,
    searchByTitleService,
    byUserService,
    updateService,
    eraseService,
    likeNewsService,
    deleteLikeNewsService,
    addCommentService,
    deleteCommentService
} from '../services/news.service.js';

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

const findById = async (req, res) => {
    try {
        const { id } = req.params;

        const news = await findByIdService(id);

        return res.send({
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
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const searchByTitle = async (req, res) => {
    try {
        const { title } = req.query;

        const news = await searchByTitleService(title);

        if (news.length === 0) {
            return res.status(404).send({ message: 'No news found with the given title.' });
        }

        return res.send({
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
            }))
        })
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const byUser = async (req, res) => {
    try {
        const id = req.userId;

        const news = await byUserService(id);

        return res.send({
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
            }))
        })
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const update = async (req, res) => {
    try {
        const { title, content, bannerImage } = req.body;

        const { id } = req.params;

        if (!title && !content && !bannerImage) {
            res.status(400).send({ message: 'At least one field is required to update.' });
        }

        const news = await updateService(id);

        if (String(news.user._id) !== req.userId) {
            return res.status(403).send({ message: 'You are not authorized to update this news.' });
        }

        await updateService(id, title, content, bannerImage);

        return res.send({ message: 'News updated successfully.' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const erase = async (req, res) => {
    try {
        const { id } = req.params;

        const news = await findByIdService(id);

        if (String(news.user._id) !== req.userId) {
            return res.status(403).send({ message: 'You are not authorized to delete this news.' });
        }

        await eraseService(id);

        return res.send({ message: 'News deleted successfully.' });
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const likeNews = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;

        const newsLiked = await likeNewsService(id, userId);

        if (!newsLiked) {
            await deleteLikeNewsService(id, userId);
            return res.status(200).send({ message: 'Like removed successfully.' });
        }
        res.status(200).send({ message: 'News liked successfully.' });
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const addComment = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;
        const { comment } = req.body;

        if (!comment) {
            return res.status(400).send({ message: 'Comment is required.' });
        }

        await addCommentService(id, userId, comment);

        res.status(200).send({ message: 'Comment added successfully.' });
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const deleteComment = async (req, res) => {
    try {
        const { idNews, idComment } = req.params;
        const userId = req.userId;

        await deleteCommentService(idNews, idComment, userId);

        const commentFinder = commentDeleted.comments.find((comment) => comment.idComment === idComment);

        if (!commentFinder) {
            return res.status(404).send({ message: 'Comment not found.' });
        }

        if (commentFinder.userId !== userId) {
            return res.status(403).send({ message: 'You are not authorized to delete this comment.' });
        }

        res.status(200).send({ message: 'Comment deleted successfully.' });
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export { create, findAll, topNews, findById, searchByTitle, byUser, update, erase, likeNews, addComment, deleteComment };
