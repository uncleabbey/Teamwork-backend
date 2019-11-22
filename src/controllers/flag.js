import flagModel from '../db/models/flagged';

const flagCtrl = async (req, res) => {
  const { userId } = req.decoded;
  const { id, type } = req.body;
  try {
    const data = await flagModel.seedFlags(userId, type, id);
    return res.status(201).json({
      status: 'success',
      message: 'Post has been Flagged as Inappropriated',
      data
    });
  } catch (error) {
    return res.status(401).json({
      status: 'error',
      error
    });
  }
};

export default flagCtrl;
