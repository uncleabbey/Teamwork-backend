const extractUrl = (req, res, next) => {
  req.body.imageUrl = req.file.url;
  return next();
};
export default extractUrl;
