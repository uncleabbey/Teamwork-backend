import { calculateLimitAndOffset, paginate } from 'paginate-info';
import models from '../db/models/Feed';

const feedCtrl = async (req, res) => {
  const {
    query: { currentPage, pageSize }
  } = req;
  try {
    const { limit, offset } = calculateLimitAndOffset(
      currentPage,
      pageSize
    );
    const rows = await models(limit, offset);
    const count = rows.length;
    const meta = paginate(currentPage, count, rows, pageSize);
    return res.status(200).json({
      status: 'success',
      data: rows.map(
        ({
          id,
          created_on: createdOn,
          title,
          content,
          authorid: authorId
        }) => ({ id, createdOn, title, content, authorId })
      ),
      meta
    });
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      error
    });
  }
};

export default feedCtrl;
