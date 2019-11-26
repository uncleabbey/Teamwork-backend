import services from '../services/gifs';
import comments from '../services/gifComments';

const { getGifComments } = comments;
const { createGifs, getGif, deleteGif } = services;

const gifsCtrl = async (req, res) => {
  const { url } = req.file;
  const { title } = req.body;
  const { userId } = req.decoded;
  const type = 'gif';
  try {
    const data = await createGifs(title, url, userId, type);
    return res.status(201).json({
      status: 'success',
      data: {
        gifId: data.gifid,
        message: 'GIF image successfully posted”',
        createdOn: data.created_on,
        title: data.title,
        imageUrl: data.imageurl,
        userId: data.userid
      }
    });
  } catch (error) {
    return res.status(401).json({
      status: 'error',
      error
    });
  }
};
const getGifById = async (req, res) => {
  const { gifId } = req.params;
  try {
    const data = await getGif(gifId);
    const allComments = await getGifComments(gifId);
    return res.status(200).json({
      status: 'success',
      data: {
        message: 'GIF image succesfully retrieved',
        id: data.gif_id,
        createdOn: data.created_on,
        title: data.title,
        url: data.img_url,
        comments: allComments.map(
          ({
            comment_id: commentId,
            author_id: authorId,
            comment,
            first_name: firstName,
            last_name: lastName,
            created_on: createdOn
          }) => ({
            commentId,
            authorId,
            comment,
            firstName,
            lastName,
            createdOn
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
const deleteGifbyId = (req, res) => {
  const { gifId } = req.params;
  deleteGif(gifId)
    .then(() => {
      res.status(200).json({
        status: 'success',
        data: {
          message: 'gif post successfully deleted'
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
export default { gifsCtrl, getGifById, deleteGifbyId };
