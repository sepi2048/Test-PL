// api/mailingList?mail=John&listid=123

// https://sendgrid.api-docs.io/v3.0/contacts

const axios = require('axios');
 
export default async function handler(req, res) {

  const { mail, list_id } = req.body;

 if (req.method === "POST") {

  if (list_id  === process.env.SENDGRID_MAILING_ID_NEWSLETTER) {

    // SEARCH: does email already exists in NEWSLETTER PAYED?
    axios.post("https://stoic-payne-386d66.netlify.app/api/SearchMailingList?mail="+mail+"&list_id="+process.env.SENDGRID_MAILING_ID_NEWSLETTER_PURCHASE)

    .then((result) => {
      
      // SEARCH RESULT: email does already exists in NEWSLETTER PAYED
      if (result.data.contact_count <= 1 ) {
        return "You are already subscribed to this newsletter"; // exit rest of script
      } else {
        // Email does NOT already exists in NEWSLETTER PAYED, add to NEWSLETTER
        axios.put("https://stoic-payne-386d66.netlify.app/api/AddMailingList?mail="+mail+"&list_id="+list_id)
      }

     })
     .catch((err) => {
       res.status(500).send({
         message:
            "Oups, there was a problem with checking your subscription",
        });
       console.error(err);
      });


  } else if (list_id  === process.env.SENDGRID_MAILING_ID_NEWSLETTER_PURCHASE)  {

    // SEARCH: does email already exists in NEWSLETTER?
    axios.post("https://stoic-payne-386d66.netlify.app/api/SearchMailingList?mail="+mail+"&list_id="+process.env.SENDGRID_MAILING_ID_NEWSLETTER)

    .then((result) => {

      // SEARCH RESULT: email does already exists in NEWSLETTER
      if (result.data.contact_count <= 1 ) {
        // DELETE from NEWSLETTER
        axios.delete(
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
      } 

      // Email does NOT already exists in NEWSLETTER (also deleted), add to NEWSLETTER PAYED
      axios.put("https://stoic-payne-386d66.netlify.app/api/AddMailingList?mail="+mail+"&list_id="+list_id)

      })
      .catch((err) => {
        res.status(500).send({
          message:
            "Oups, there was a problem with checking your subscription",
        });
        console.error(err);
      });

  }

  }
}