const axios = require('axios');

const mail = "helloworld@gmail.com";


exports.handler = (event, context, callback) => {

    /* axios.put("https://stoic-payne-386d66.netlify.app/api/mailingList?mail="+mail)
      .then((res) => {
        callback(null, {
          statusCode: 200,
          body: res.data.title,
        });
      })
      .catch((err) => {
        callback(err);
      });*/


    // call mailingList API
    const mail = "ludde@gmail.com";
    let list = {};
    try {
        list = axios.put("https://stoic-payne-386d66.netlify.app/api/mailingList?mail="+mail);
        return {
            statusCode: 200,
            headers: {},
            body: JSON.stringify({
                status: 'Added to mailinglist',
            }),
        }
      } catch(err) {
        console.error(err);
        console.error(err.list.body);
      }


  };