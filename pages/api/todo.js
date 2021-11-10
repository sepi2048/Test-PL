const axios = require('axios');

export default async function handler(req, res) {
  axios.get('https://jsonplaceholder.typicode.com/todos/1')
    .then((res) => {
      res.status(200).send({
        message:
          "Your email has been succesfully added to the mailing list. Welcome 👋",
      });
    })
    .catch((err) => {
      console.log(err);
    });
}