import createGifs from '../services/gifs';

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

export default gifsCtrl;
