const mongoose = require("mongoose");
require('dotenv').config();

const connect = async (_client) => {
  // create a new connection if one doesn't already exist
  if (!_client) {
    mongoose.set("strictQuery", false);
    _client = await mongoose.connect('mongodb+srv://bidisha:bidisha@cluster0.vns42.mongodb.net/?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  return _client;
};

const close = async (_client) => {
  // destroy the connection if it exists
  if (_client) {
    await _client.disconnect();
    _client = null;
  }
};

module.exports = {
  connect,
  close,
};