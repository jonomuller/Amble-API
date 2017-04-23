module.exports.clearDB = function(db, done) {
  mongoose.connection.db.dropCollection(db, function(error, result) {
    if (error) throw error;
    done();
  });
};