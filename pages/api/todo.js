const axios = require('axios');

// https://stackoverflow.com/questions/65859582/how-to-convert-lambda-function-into-a-next-js-api-friendly-function

export default async function handler(req, res) {
  const result = await axios.get('https://jsonplaceholder.typicode.com/todos/1')
  res.statusCode = 200
  res.send(result.data.title)
}


