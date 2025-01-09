const throwError = function (errorText, errorCode) {
  const error = new Error();
  
  error.message = errorText;
  error.status = errorCode;
  throw error;
};

module.exports = { throwError };
