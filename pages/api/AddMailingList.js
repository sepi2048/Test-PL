// // api/mailingList?mail=John&listid=123

const axios = require('axios');
 
export default async function handler(req, res) {

  const { mail, list_id } = req.body;

 if (req.method === "PUT") {

  axios
     .put(
       "https://api.sendgrid.com/v3/marketing/contacts",
       {
         contacts: [{ email: `${mail}` }],
         list_ids: [process.env.SENDGRID_MAILING_ID_BOOTCAMP],
       },
       {
         headers: {
           "content-type": "application/json",
           Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
         },
       }
     )
     .then((result) => {
       res.status(200).send({
         message:
           "Your email has been succesfully added to the mailing list. Welcome 👋",
       });
       console.log(result.data.contact_count);
     })
     .catch((err) => {
       res.status(500).send({
         message:
           "Oups, there was a problem with your subscription, please try again or contact us",
       });
       console.error(err);
     });
  }
}