// // api/mailingList?mail=John&listid=123

const axios = require('axios');
 
export default async function handler(req, res) {

  const { mail, listID } = req.body;

 if (req.method === "PUT") {

  if (listID === process.env.SENDGRID_MAILING_ID_NEWSLETTER) { // prøver "NEWSLETTER" befinner seg i "NEWSLETTER PAYED"
    // Befinner mail seg i NEWSLETTER PAYED?
    // search return

    //if (contact_count >= 1 ) {
    //  return "You are already subscribed to this newsletter"; // exit rest of script
    //}
  

  } else if (listID === process.env.SENDGRID_MAILING_ID_NEWSLETTER_PURCHASE)  {
    // Befinner mail seg i NEWSLETTER?
    // search return

    //if (contact_count >= 1 ) {
      // delete email from NEWSLETTER
  }

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