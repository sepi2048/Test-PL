// api/mailingList?mail=John&listid=123

// https://sendgrid.api-docs.io/v3.0/contacts

/*
* handler = event context?
* error decoding lambda response: invalid status code returned from lambda: 0?
* Checkout checkbox? (tutorial)
* Correct error handelig? (getPDF and PDFWatermark)
* Test Scenario:
* 1) Move coffee from NEWSLETTER to NEWSLETTER PAYED (if else)
* 2) Add Isabelle to NEWSLETTER PAYED (else)
*/

const axios = require('axios');
 
export default async function handler(req, res) {

  const { mail, list_id } = req.query;

  console.log("CheckMailinglist: " + mail + " " + list_id);


  if (req.method === "POST") {

    if (list_id  === process.env.SENDGRID_MAILING_ID_NEWSLETTER) {

      try {

        // SEARCH: does email already exists in NEWSLETTER PAYED?
        const search_result_payed = await axios.post("https://stoic-payne-386d66.netlify.app/api/SearchMailingList?mail="+mail+"&list_id="+process.env.SENDGRID_MAILING_ID_NEWSLETTER_PURCHASE)
      
        console.log(search_result_payed.data.contact_count);

        // SEARCH RESULT: email does already exists in NEWSLETTER PAYED
        if (search_result_payed.data.contact_count >= 1 ) {
            res.send({
              message:
              "You are already subscribed to NEWSLETTER PAYED",
            });
        } else {
          try {
            // Email does NOT already exists in NEWSLETTER PAYED, add to NEWSLETTER
            await axios.put("https://stoic-payne-386d66.netlify.app/api/AddMailingList?mail="+mail+"&list_id="+list_id)
            res.send({
              message:
              "You are added to NEWSLETTER",
            });
          } catch (err) {
              console.error('Could not add email to NEWSLETTER: ', err)
          }
        }

      } catch (err) {    
          console.error('There was a problem with checking your NEWSLETTER PAYED subscription: ', err)
      }


    } else if (list_id  === process.env.SENDGRID_MAILING_ID_NEWSLETTER_PURCHASE)  {


        try {

        // SEARCH: does email already exists in NEWSLETTER?
        const search_result_newsletter = await axios.post("https://stoic-payne-386d66.netlify.app/api/SearchMailingList?mail="+mail+"&list_id="+process.env.SENDGRID_MAILING_ID_NEWSLETTER)

        //console.log(result.data.result[0].id);

        // SEARCH RESULT: email does already exists in NEWSLETTER
        if (search_result_newsletter.data.contact_count >= 1 ) {

          try {  
            // REMOVE from NEWSLETTER
            axios.delete(
              "https://api.sendgrid.com/v3/marketing/lists/"+process.env.SENDGRID_MAILING_ID_NEWSLETTER+"/contacts?contact_ids="+search_result_newsletter.data.result[0].id,
            {
              headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
              },
            }
            ) 

            console.log("Removed from NEWSLETTER");

          } catch (err) {
            console.error('Could not be remove from NEWSLETTER: ', err)
          }  

        }
        // Email does NOT already exists in NEWSLETTER (also deleted), add to NEWSLETTER PAYED
        try {
          await axios.put("https://stoic-payne-386d66.netlify.app/api/AddMailingList?mail="+mail+"&list_id="+list_id)
          res.send({
            message:
            "You are already added to NEWSLETTER PAYED (also hidden transfer)",
          });
        } catch (err) {
            console.error('Could not add email to NEWSLETTER PAYED: ', err)
        }


      } catch (err) {    
        console.error('There was a problem with checking NEWSLETTER subscription: ', err)
      }

     
     } else {

      // list_id Email NOT NEWSLETTER or NEWSLETTER PAYED
      try {
        await axios.put("https://stoic-payne-386d66.netlify.app/api/AddMailingList?mail="+mail+"&list_id="+list_id)
        res.send({
          message:
          "You are added to this newsletter",
        });
      } catch (err) {
          console.error('Could not add email to malinglist: ', err)
      }


    }

  }
}