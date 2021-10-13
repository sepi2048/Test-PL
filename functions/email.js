const axios = require('axios');
const sgMailClient = require("@sendgrid/mail");
sgMailClient.setApiKey(process.env.SENDGRID_API_KEY);
// Includes crypto module
const crypto = require('crypto');


// Create the API endpoint function with a req and res parameter
exports.handler = async function(req, res) {

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

    console.log(JSON.stringify(data, null, 2));

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
    if (data.payload.fulfillment.digital.downloads.lifespan.expiry_date !== null) {

        const getExpiryDate = data.payload.fulfillment.digital.downloads.lifespan.expiry_date;
        const milliseconds = getExpiryDate * 1000;
        const dateObject = new Date(milliseconds);
        const humanDateFormat = dateObject.toLocaleString();
        expiry = humanDateFormat.substr(humanDateFormat.indexOf(" ") + 1);
    } 

    console.log("Digital: " + JSON.stringify(data.payload.fulfillment.digital.downloads.lifespan.expiry_date,null,2)); // 4) c1c34441 INFO   lifespan: undefined

    // Order created at
    const orderCreated = data.created;    
    let options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const created = new Date(orderCreated * 1000).toLocaleString('default', options);
    // 3) Email tml output data?

    console.log("orderCreated: " + orderCreated);


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
        template_id: 'd-98eb7f60399e42eba8a2c258d2222d0c'
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
        console.log("Payload content: ", emailPayload );
    }
}