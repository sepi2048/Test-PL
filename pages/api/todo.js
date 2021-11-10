const axios = require('axios');

// https://stackoverflow.com/questions/65859582/how-to-convert-lambda-function-into-a-next-js-api-friendly-function

export default async function handler(req, res) {

  try {
    const result = await axios.get('https://jsonplaceholder.typicode.com/todos/1')
    res.status(200).send({
      message:
      result.data.title,
    });
  } catch (err) {
      console.error('Error from function: ', err)
  }

}


