const axios = require('axios');

export default async function handler(req, res) {
  const result = await axios.get('https://jsonplaceholder.typicode.com/todos/1')
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.json(result)
}


