const axios = require('axios');

export default async function handler(req, res) {
  return axios.get('https://jsonplaceholder.typicode.com/todos/1')

  .then((res) => {
    console.log("data", res.data);
    return {
      statusCode: 200,
      body: JSON.stringify(res.data),
    };
  })
  .catch((error) => {
    console.log(error);
    return {
      statusCode: 502,
      body: JSON.stringify(error.message),
    };
  });

}


