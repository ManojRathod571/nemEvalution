const mongoose = require("mongoose");

module.exports = connection = async () => {
  return await mongoose.connect(
    "mongodb+srv://manojrathod:manojrathod@cluster0.7tr5ebo.mongodb.net/todoevalutiondb?retryWrites=true&w=majority"
  );
};
