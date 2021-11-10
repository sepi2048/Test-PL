const axios = require('axios');

export default async function handler(req, res) {
  try {
    const result = axios.get('https://jsonplaceholder.typicode.com/todos/1')
    res.status(200).send(result)
    console.log(result)
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' })
  }
}