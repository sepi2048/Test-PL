const axios = require('axios');

// https://travishorn.com/netlify-lambda-functions-from-scratch-1186f61c659e

exports.handler = function(event, context, callback) {
  axios.get('https://jsonplaceholder.typicode.com/todos/1')
    .then((res) => {
      callback(null, {
        statusCode: 200,
        body: res.data.title,
      });
    })
    .catch((err) => {
      callback(err);
    });
};


