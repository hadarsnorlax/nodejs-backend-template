const ApiResponse = require('utils/api-responses');

const invalidPathHandler = (req, res) => {
  const error = ApiResponse.invalidPathError();
  return res.status(error.status).json(error.message);
};

module.exports = invalidPathHandler;
