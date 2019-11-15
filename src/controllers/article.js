import articleService from '../services/article';

const createArticle = (req, res) => {
  const { userId } = req.decoded;
  const { title, article } = req.body;
  articleService(title, article, userId)
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

export default createArticle;
