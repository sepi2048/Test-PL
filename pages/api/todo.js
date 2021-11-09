const axios = require('axios');

export default async function handler(req, res) {
  try {
    const result = axios.get('https://jsonplaceholder.typicode.com/todos/1')
    res.status(200).send(result.data.title)
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' })
  }
}





exports.handler = (event, context, callback) => {
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
