import News from '../models/News.js';

const createService = (body) => News.create(body);

const findAllService = (offset, limit) => News.find().sort({ _id: -1 }).skip(offset).limit(limit).populate('user');

const countNews = () => News.countDocuments();

const topNewsService = () => News.findOne().sort({ _id: -1 }).populate('user');

const findByIdService = (id) => News.findById(id).populate('user');

const searchByTitleService = (title) => News.find({ title: { $regex: '${title || ""}', $options: 'i' } }).sort({ _id: -1 }).populate('user')

const byUserService = (id) => News.find({ user: id }).sort({ _id: -1 }).populate('user');

const updateService = (id, title, content, bannerImage) => News.findOneAndUpdate({ _id: id }, { title, content, bannerImage }, rawResult = true);

const eraseService = (id) => News.findOneAndDelete({ _id: id });

const likeNewsService = async (idNews, userId) => {
    return News.findeOneAndUpdate(
        { _id: idNews, 'likes.userId': { $nin: [userId] } }, { $push: { likes: userId, created: new Date() } })
}

const deleteLikeNewsService = async (idNews, userId) => {
    return News.findOneAndUpdate(
        { _id: idNews }, { $pull: { likes: userId } }
    )
}

const addCommentService = async (idNews, comment, userId) => {
    const idComment = Math.floor(Date.now() * Math.random()).toString(36);

    return News.findOneAndUpdate({ _id: idNews }, { $push: { comments: { idComment, userId, comment, createdAt: new Date() } } });
}

const deleteCommentService = async (idNews, idComment, userId) => {
    return News.findOneAndUpdate(
        { _id: idNews }, { $pull: { comments: { idComment, userId } } }
    )
}
export {
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
};
