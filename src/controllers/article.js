import articles from '../services/article';

const {
  createArticles,
  getOneArticle,
  updateArticle,
  deleteArticle
} = articles;
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
  const { articleId } = req.params;
  getOneArticle(articleId)
    .then(data => {
      res.status(200).json({
        status: 'success',
        data: {
          message: 'Article successfully retrieved',
          id: data.articleid,
          title: data.title,
          article: data.article
        }
      });
    })
    .catch(error => {
      res.status(400).json({
        status: 'error',
        error: error.message
      });
    });
};
const updateArticlebyId = (req, res) => {
  const { articleId } = req.params;
  const { title, article } = req.body;
  updateArticle(title, article, articleId).then(data => {
    res
      .status(201)
      .json({
        status: 'success',
        data: {
          message: 'Article Successfully Updated',
          title: data.title,
          article: data.article
        }
      })
      .catch(error => {
        res.status(400).json({
          status: 'error',
          error: error.message
        });
      });
  });
};
const deleteArticlebyId = (req, res) => {
  const { articleId } = req.params;
  deleteArticle(articleId)
    .then(() => {
      res.status(200).json({
        status: 'success',
        data: {
          message: 'Article successfully deleted'
        }
      });
    })
    .catch(error => {
      res.status(400).json({
        status: 'error',
        error: error.message
      });
    });
};
export default {
  createArticle,
  getArticlebyId,
  updateArticlebyId,
  deleteArticlebyId
};
