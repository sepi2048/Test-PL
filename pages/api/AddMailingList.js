// // api/mailingList?mail=John&listid=123

const axios = require('axios');
 
export default async function handler(req, res) {

  //const { mail, list_id} = req.body; // via API
  const { mail, list_id }  = req.query; // via url 

  console.log("AddMailinglist: " + mail + " " + list_id);

 if (req.method === "PUT") {


  // https://sendgrid.api-docs.io/v3.0/contacts/delete-contacts
  // Delete email from spesific list
  axios
     .put(
       "https://api.sendgrid.com/v3/marketing/contacts",
       {
        contacts: [{ email: `${mail}` }],
        list_ids: [list_id],
       },
       {
         headers: {
           "content-type": "application/json",
           Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
         },
       }
     )
     .then((result) => {
      res.status(202).send({
         message:
           "Your email has been succesfully added to the mailing list. Welcome 👋",
       });
       console.log(result);
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