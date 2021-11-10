const axios = require('axios');

export default async function handler(req, res) {
  const result = awaitaxios.get('https://jsonplaceholder.typicode.com/todos/1')
  res.statusCode = 200
  res.send(result)
}


