// // api/mailingList?mail=John&listid=123

const axios = require('axios');


 
export default async function handler(req, res) {

  const { mail, list_id} = req.body;

 if (req.method === "POST") {
// https://docs.sendgrid.com/api-reference/contacts/add-or-update-a-contact

  const search = await axios
     .post(
       "https://api.sendgrid.com/v3/marketing/contacts/search",
       {
        query: "email LIKE '"+ mail +"%' AND CONTAINS(list_ids, '"+ process.env.SENDGRID_MAILING_ID_BOOTCAMP +"')"
       },
       {
         headers: {
           "content-type": "application/json",
           Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
         },
       }
     )
     .then((result) => {
      res.status(200).send(result);
      console.log(search);
       //res.status(200).send(result.data.contact_count);
       //return result.data.contact_count;
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
