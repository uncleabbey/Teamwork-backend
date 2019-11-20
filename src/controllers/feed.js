import models from '../db/models/Feed';

const feedCtrl = (req, res) => {
  models()
    .then(data => {
      res.status(200).json({
        status: 'success',
        data: data.map(
          ({
            id,
            created_on: createdOn,
            title,
            content,
            authorid: authorId
          }) => ({ id, createdOn, title, content, authorId })
        )
      });
    })
    .catch(error => {
      return res.status(400).json({
        status: 'error',
        error
      });
    });
};

export default feedCtrl;
