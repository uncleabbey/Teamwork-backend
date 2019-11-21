import articles from '../services/article';
import comments from '../services/articleComments';
import models from '../db/models/article';

const { getArtComments } = comments;
const {
  createArticles,
  getOneArticle,
  updateArticle,
  deleteArticle
} = articles;
const createArticle = (req, res) => {
  const { userId } = req.decoded;
  const { title, article, tags } = req.body;
  const tag = tags.split(' ');
  createArticles(title, article, userId, tag)
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

const getArticlebyId = async (req, res) => {
  const { articleId } = req.params;
  try {
    const data = await getOneArticle(articleId);
    const allComments = await getArtComments(articleId);
    return res.status(200).json({
      status: 'success',
      data: {
        message: 'Article successfully retrieved',
        id: data.articleid,
        title: data.title,
        article: data.article,
        comments: allComments.map(
          ({
            comment_id: commentId,
            comment,
            author_id: authorId
          }) => ({
            commentId,
            comment,
            authorId
          })
        )
      }
    });
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      error: error.message
    });
  }
};
const updateArticlebyId = (req, res) => {
  const { articleId } = req.params;
  const { title, article, tags } = req.body;
  const tag = tags.split(' ');
  updateArticle(title, article, tag, articleId)
    .then(data => {
      return res.status(201).json({
        status: 'success',
        data: {
          message: 'Article Successfully Updated',
          title: data.title,
          article: data.article
        }
      });
    })
    .catch(error => {
      return res.status(400).json({
        status: 'error',
        error
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
const searchArticleByTags = async (req, res) => {
  const { tags } = req.body;
  try {
    const data = await models.searchByTags(tags);
    if (data.length === 0) {
      return res.status(200).json({
        status: 'success',
        data: {
          message: 'No Article has that tag in the database'
        }
      });
    }
    return res.status(200).json({
      status: 'success',
      data: {
        message: 'article successfully retrieved',
        data
      }
    });
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      error
    });
  }
};
export default {
  createArticle,
  getArticlebyId,
  updateArticlebyId,
  deleteArticlebyId,
  searchArticleByTags
};
