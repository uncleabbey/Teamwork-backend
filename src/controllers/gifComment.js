import comments from '../services/gifComments';
import gifs from '../services/gifs';

const { getGif } = gifs;
const { createGifComments } = comments;
const createGifsComment = async (req, res) => {
  const { userId } = req.decoded;
  const { gifId } = req.params;
  const { comment } = req.body;
  try {
    const data = await createGifComments(gifId, userId, comment);
    const gif = await getGif(gifId);
    return res.status(201).json({
      status: 'success',
      data: {
        message: 'comment successfully created',
        createdOn: data.created_on,
        gifTitle: gif.title,
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
export default createGifsComment;
