import services from '../services/gifs';

const { createGifs, getGif } = services;
const gifsCtrl = async (req, res) => {
  const { url } = req.file;
  const { title } = req.body;
  const { userId } = req.decoded;
  try {
    const data = await createGifs(title, url, userId);
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
    return res.status(200).json({
      status: 'success',
      data: {
        message: 'GIF image succesfully retrieved',
        id: data.gif_id,
        createdOn: data.created_on,
        title: data.title,
        url: data.img_url
      }
    });
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      error: error.message
    });
  }
};
export default { gifsCtrl, getGifById };
