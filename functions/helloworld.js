const axios = require('axios');

const mail = "helloworld@gmail.com";


exports.handler = (event, context, callback) => {
    axios.put("/api/mailingList?mail="+mail)
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