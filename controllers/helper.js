module.exports.mongooseValidationError = function(error, res) {
  var message = 'Validation error';

  if (error.message != undefined) {
    message = error.message;
  }
  
  for (let key in error.errors) {
    if (error.errors[key].message != undefined) {
      message = error.errors[key].message;
    }
  }

  return res.status(400).json({
    success: false,
    error: message
  });
};