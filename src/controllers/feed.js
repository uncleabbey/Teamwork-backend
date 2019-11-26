import { calculateLimitAndOffset, paginate } from 'paginate-info';
import models from '../db/models/Feed';

const { feed, countFeed } = models;

const feedCtrl = async (req, res) => {
  const {
    query: { currentPage, pageSize }
  } = req;
  try {
    const { limit, offset } = calculateLimitAndOffset(
      currentPage,
      pageSize
    );
    const rows = await feed(limit, offset);
    const feedCount = await countFeed();
    const count = Number(feedCount.count);
    const meta = paginate(currentPage, count, rows, pageSize);
    return res.status(200).json({
      status: 'success',
      data: rows.map(
        ({
          feed_id: feedID,
          id,
          type,
          created_on: createdOn,
          title,
          content,
          authorid: authorId,
          firstname: firstName,
          lastname: lastName
        }) => ({
          feedID: Number(feedID),
          id,
          createdOn,
          title,
          content,
          authorId,
          type,
          firstName,
          lastName
        })
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
