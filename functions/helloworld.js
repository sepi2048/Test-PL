const axios = require('axios');

export default async function handler(req, res) {

    // how to call nextjs API from with netlify function?

    const mail = "helloworld@gmail.com";
    // add to mailinglist
    return axios
    .put("/api/mailingList?mail="+mail)
    .then((result) => {
      if (result.status === 200) {
        toast.success(result.data.message);
      }
    })
    .catch((err) => {
      console.log(err);
    });

    

}