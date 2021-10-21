const axios = require('axios');
const sgMailClient = require("@sendgrid/mail");
sgMailClient.setApiKey(process.env.SENDGRID_API_KEY);
// Includes crypto module
const crypto = require('crypto');
const { getMaxListeners } = require('process');


// Create the API endpoint function with a req and res parameter
exports.handler = async function(req, res, callback) {

//export default async function handler(req, res) {
    if (!req.body || req.httpMethod !== 'POST') {
        return {
            status: 405,
            headers: {},
            body: JSON.stringify({
                status: 'Invalid HTTP method',
            }),
        }
    }

    const data = JSON.parse(req.body);

    // Request for your merchant information so that you can use your email
    // to include as the 'from' property to send to the SendGrid API
    const merchant = axios.get(`${process.env.CHEC_API_URL}/v1/merchants`, {
        headers: {
            'X-Authorization': process.env.CHEC_SECRET_KEY,
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
    }).then((response) => response.json);

    //console.log(JSON.stringify(data, null, 2));

    // Extract the signature from the registered `orders.create` webhook
    const { signature } = data;

    delete data.signature;

    // Your Chec webhook signing key, from the Chec Dashboard webhooks view
    const webHookSigningKey = 'KEJlxz6cIlrWIpsX5jypcMeGl2uh7jJg';


    // Verify the signature
    const expectedSignature = crypto.createHmac('sha256', webHookSigningKey)
        .update(JSON.stringify(data))
        .digest('hex');
    if (expectedSignature !== signature) {
        console.error('Signature mismatched, skipping.')
    }

    // Verify the age of the request to make sure it isn't more than 5 minutes old.
    if (new Date(data.created * 1000) < new Date() - 5 * 60 * 1000) {
        console.error('Webhook was sent too long ago, could potentially be fake, ignoring');
    }

    // Because you will need to list out the order line items, map through the returned line items
    // and structure out the data you need to display in the email receipt for your customer
    // Note that we are keeping the data structure minimal here
    const orderLineItems = data.payload.order.line_items.map((lineItem) => ({
        text: lineItem.product_name,
        qty: lineItem.quantity,
        price: lineItem.line_total.formatted_with_symbol,
    }));


    // Get ebook expiry date if exists
    let expiry = false;
    if (data.payload.fulfillment.digital.downloads[0].lifespan.expiry_date !== null) {

        const getExpiryDate = data.payload.fulfillment.digital.downloads[0].lifespan.expiry_date;
        let expiry_options = { year: 'numeric', month: 'short', day: 'numeric'};
        expiry = new Date(getExpiryDate * 1000).toLocaleString('default', expiry_options); // TEST
    } 

    //console.log("expiry: " + expiry); 

    // Order created at
    const getCreatedAt = data.created;    
    let created_options = { year: 'numeric', month: 'long', day: 'numeric'};
    const created = new Date(getCreatedAt * 1000).toLocaleString('default', created_options);

    //console.log("order created: " + created);


    // 1) created on January 20, 2020 5:40 PM .toLocaleString or 
    // 2) export/imort html template sendgrid
    // test, test, test


    // Signature is verified, continue to send data to SendGrid
    // Create the email object payload to fire off to SendGrid
    const emailPayload = {
        to: data.payload.customer.email,
        from: data.payload.merchant.support_email,
        subject: `Thank you for your order ${data.payload.customer.firstname}`,
        text: `Your order number is ${data.payload.customer_reference}`,
        html: `&nbsp;`,

        // SendGrid expects a JSON blog containing the dynamic order data your template will use
        // More information below in 'What's next?' on how to configure your dynamic template in SendGrid
        // The property key names will depend on what dynamic template you create in SendGrid
        dynamic_template_data: {
            total: data.payload.order.subtotal.formatted_with_symbol,
            items: orderLineItems,
            receipt: true,
            name: data.payload.billing.name,
            address01: data.payload.billing.street,
            city: data.payload.billing.town_city,
            state: data.payload.billing.county_state,
            zip : data.payload.billing.postal_zip_code,
            orderId : data.payload.id,
            expiry : expiry,
            customerRef : data.payload.customer_reference,
            orderCreated : created,
        },
        template_id: process.env.SENDGRID_TEMPLATE_ID
    };


    let response = {};
    try {
        // Call the SendGrid send mail endpoint
        response = await sgMailClient.send(emailPayload);
        return {
            statusCode: 200,
            headers: {},
            body: JSON.stringify({
                status: 'Email sent!',
            }),
        }
    } catch (err) {
        console.error('Error from function: ', err)
        console.error(err.response.body);
    }



    const mail = "helloworld@gmail.com";

    axios.put("https://stoic-payne-386d66.netlify.app/api/mailingList?mail="+mail)
    .then((res) => {
      callback(null, {
        statusCode: 200,
        body: res.data.title,
      });
    })
    .catch((err) => {
      callback(err);
    });

}