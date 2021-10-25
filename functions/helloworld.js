
const axios = require('axios');

const mail = "fiisen@gmail.com";


exports.handler = (event, context, callback) => {
    axios.put("https://stoic-payne-386d66.netlify.app/api/AddMailingList?mail="+mail)
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