
const axios = require('axios');

const mail = "ludde@gmail.com";


exports.handler = (event, context, callback) => {
    axios.put("https://stoic-payne-386d66.netlify.app/api/mailingList?mail="+mail)
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