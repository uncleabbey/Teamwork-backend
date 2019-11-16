import comments from '../services/articleComments';
import service from '../services/article';

const { createArtComments } = comments;

const { getOneArticle } = service;
const createArticleComment = async (req, res) => {
  const { userId } = req.decoded;
  const { articleId } = req.params;
  const { comment } = req.body;
  try {
    const data = await createArtComments(articleId, userId, comment);
    const article = await getOneArticle(articleId);
    return res.status(201).json({
      status: 'success',
      data: {
        message: 'Comment successfully created',
        createdOn: data.created_on,
        articleTitle: article.title,
        article: article.article,
        comment: data.comment
      }
    });
  } catch (error) {
    return res.status(401).json({
      status: 'error',
      error: error.message
    });
  }
};
export default createArticleComment;
