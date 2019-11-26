import comments from '../services/gifComments';
import gifs from '../services/gifs';
import users from '../db/models/user';

const { getGif } = gifs;
const { findUserById } = users;
const { createGifComments } = comments;
const createGifsComment = async (req, res) => {
  const { userId } = req.decoded;
  const { gifId } = req.params;
  const { comment } = req.body;
  try {
    const data = await createGifComments(gifId, userId, comment);
    const gif = await getGif(gifId);
    const user = await findUserById(userId);
    return res.status(201).json({
      status: 'success',
      data: {
        message: 'comment successfully created',
        createdOn: data.created_on,
        gifTitle: gif.title,
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
export default createGifsComment;
