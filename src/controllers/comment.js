import comments from '../services/articleComments';
import service from '../services/article';
import users from '../db/models/user';

const { createArtComments } = comments;
const { findUserById } = users;
const { getOneArticle } = service;
const createArticleComment = async (req, res) => {
  const { userId } = req.decoded;
  const { articleId } = req.params;
  const { comment } = req.body;
  try {
    const data = await createArtComments(articleId, userId, comment);
    const article = await getOneArticle(articleId);
    const user = await findUserById(userId);
    return res.status(201).json({
      status: 'success',
      data: {
        message: 'Comment successfully created',
        createdOn: data.created_on,
        articleTitle: article.title,
        article: article.article,
        comment: data.comment,
        commentData: {
          commentId: data.comment_id,
          createdOn: data.created_on,
          comment: data.comment,
          firstName: user.first_name,
          lastName: user.last_name
        }
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
