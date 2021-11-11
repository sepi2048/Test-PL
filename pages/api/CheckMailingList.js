// api/mailingList?mail=John&listid=123

// https://sendgrid.api-docs.io/v3.0/contacts

/*
* handler = event context?
* error decoding lambda response: invalid status code returned from lambda: 0?
* Checkout checkbox? (tutorial)
* Correct error handelig? (getPDF and PDFWatermark)
*/

const axios = require('axios');
 
export default async function handler(req, res) {

  const { mail, list_id } = req.body;

  console.log("CheckMailinglist: " + mail + " " + list_id);


 if (req.method === "POST") {

  if (list_id  === process.env.SENDGRID_MAILING_ID_NEWSLETTER) {

    try {

      // SEARCH: does email already exists in NEWSLETTER PAYED?
      const search_result = await axios.post("https://stoic-payne-386d66.netlify.app/api/SearchMailingList?mail="+mail+"&list_id="+process.env.SENDGRID_MAILING_ID_NEWSLETTER_PURCHASE)
    
      // SEARCH RESULT: email does already exists in NEWSLETTER PAYED
      if (search_result.data.contact_count >= 1 ) {
          res.write({
            message:
            "You are already subscribed to this newsletter",
          });
      } else {
        try {
          // Email does NOT already exists in NEWSLETTER PAYED, add to NEWSLETTER
          await axios.put("https://stoic-payne-386d66.netlify.app/api/AddMailingList?mail="+mail+"&list_id="+list_id)
          res.write({
            message:
            "You are added to this newsletter",
          });
        } catch (err) {
            console.error('Could not add email to malinglist: ', err)
        }
      }

    } catch (err) {    
        console.error('There was a problem with checking your subscription: ', err)
    }


  } else if (list_id  === process.env.SENDGRID_MAILING_ID_NEWSLETTER_PURCHASE)  {

    // SEARCH: does email already exists in NEWSLETTER?
    axios.post("https://stoic-payne-386d66.netlify.app/api/SearchMailingList?mail="+mail+"&list_id="+process.env.SENDGRID_MAILING_ID_NEWSLETTER)

    .then((result) => {

      //console.log(result.data.result[0].id);

      // SEARCH RESULT: email does already exists in NEWSLETTER
      if (result.data.contact_count >= 1 ) {
        console.log("Inside else-if if statement");
        // REMOVE from NEWSLETTER
        axios.delete(
          "https://api.sendgrid.com/v3/marketing/lists/"+process.env.SENDGRID_MAILING_ID_NEWSLETTER+"/contacts?contact_ids="+result.data.result[0].id,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
          },
        }
        ) .then((result) => { 
          res.status(202).write({
            message:
              "Email removed from Newsletter Signup Form",
          }); 
        });
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

  } else {

    // list_id Email NOT NEWSLETTER or NEWSLETTER PAYED
    axios.put("https://stoic-payne-386d66.netlify.app/api/AddMailingList?mail="+mail+"&list_id="+list_id)

  }

  }
}