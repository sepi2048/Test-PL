const axios = require('axios');


// /api/getExtrafield?id=ord_gnZO5krjZxo7MN


export default async function handler(req, res) {


    const {id} = req.query;

    try {

      const checSecretAPIKey = process.env.CHEC_SECRET_KEY;
      let headers = {
          "X-Authorization": checSecretAPIKey,
          "Accept": "application/json",
          "Content-Type": "application/json",
      };

      // https://commercejs.com/docs/api/?javascript#get-order
      const response = await fetch("https://api.chec.io/v1/orders/"+id, {
          method: "GET",
          headers: headers,
      })
      
      const data = await response.json()

      const extrafield = data.extra_fields;

      const mailinglist = process.env.MAILINGLIST_EXTRA_FIELD_ID;
      
      const index = extrafield.findIndex( (element) => element.id === mailinglist);

      res.status(200).send({
          message:
          extrafield[index].value
      });


    } catch (e) {
        console.log(e);
    }

}


