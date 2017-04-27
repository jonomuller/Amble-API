module.exports.mongooseValidationError = function(error, res) {
  for (let key in error.errors) {
    let message = error.errors[key].message;
    if (message != undefined) {
      return res.status(400).json({
               success: false,
               error: message
             });
    }
  }
};