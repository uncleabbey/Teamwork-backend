import articles from '../services/article';

const { createArticles, getOneArticle } = articles;
const createArticle = (req, res) => {
  const { userId } = req.decoded;
  const { title, article } = req.body;
  createArticles(title, article, userId)
    .then(data => {
      res.status(201).json({
        status: 'success',
        data: {
          message: 'Article successfully posted',
          articleId: data.articleid,
          createdOn: data.created_on,
          title: data.title,
          userId: data.user_id
        }
      });
    })
    .catch(error => {
      res.status(401).json({
        status: 'error',
        error: error.message
      });
    });
};

const getArticlebyId = (req, res) => {
  const { id } = req.params;
  getOneArticle(id).then(data => {
    res.status(200).json({
      status: 'success',
      data: {
        message: 'Article successfully retrieved',
        id: data.articleid,
        title: data.title,
        article: data.article
      }
    });
  });
};
export default { createArticle, getArticlebyId };
