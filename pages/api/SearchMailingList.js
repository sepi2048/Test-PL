// // api/mailingList?mail=John&listid=123

const axios = require('axios');


 
export default async function handler(req, res) {

  //const { mail, list_id} = req.body; // via API
  const { mail, list_id }  = req.query; // via url 

  console.log("SearchMailinglist: " + mail + " " + list_id);

 if (req.method === "POST") {
// https://docs.sendgrid.com/api-reference/contacts/add-or-update-a-contact

     try {
        await axios
        .post(
          "https://api.sendgrid.com/v3/marketing/contacts/search",
          {
          query: "email LIKE '"+ mail +"%' AND CONTAINS(list_ids, '"+ list_id +"')"
          },
          {
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
            },
          }
        )

        console.log('Searched for: ', mail ," in mailinglist: ", list_id)

    } catch (err) {
        console.error('Error from function: ', err)
    }     
  }
}
