const axios = require('axios');
const sgMailClient = require("@sendgrid/mail");
sgMailClient.setApiKey(process.env.SENDGRID_API_KEY);
// Includes crypto module
const crypto = require('crypto');
const { getMaxListeners } = require('process');
const { componentsToColor } = require('pdf-lib');


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


    const orderId = data.payload.id;
    const expiry_options = { year: 'numeric', month: 'short', day: 'numeric'};
    const url = "/api/getPDF?id="+orderId+"&dwnld=";


    // date between two dates (https://jsfiddle.net/cqn2fepm/1/)
    function daysUtilExpiry(endDate) {

        const today  = new Date();
    
        const minute = 1000 * 60;
        const hour = minute * 60;
        const day = hour * 24;
    
        const diffInMs = new Date(endDate*1000) - new Date(today);
        const days = Math.round(diffInMs / day);
        
        return days;
        
    }

    console.log("data.fulfillment.digital: ", data.fulfillment.digital);
    
    // const downloadData = data.fulfillment.digital.downloads.map((download) => {

    //     console.log("download: ", download);

    //     download.packages.map((packages) => ({

    //       productName: packages.product_name,
    //       watermark: url+packages.id,
    //       expiry: packages.lifespan.expiry_date ? new Date(packages.lifespan.expiry_date * 1000).toLocaleString('default', expiry_options) : false,
    //       days: packages.lifespan.expiry_date ? daysUtilExpiry(packages.lifespan.expiry_date) : false

    //     }))

    //   });



    // Get ebook expiry date if exists
    // let expiry = false;
    // if (data.payload.fulfillment.digital.downloads[0].lifespan.expiry_date !== null) {

    //     const getExpiryDate = data.payload.fulfillment.digital.downloads[0].lifespan.expiry_date;
    //     let expiry_options = { year: 'numeric', month: 'short', day: 'numeric'};
    //     expiry = new Date(getExpiryDate * 1000).toLocaleString('default', expiry_options); // TEST
    // } 

    //console.log("expiry: " + expiry); 

    // Order created at
    const getCreatedAt = data.created;    
    let created_options = { year: 'numeric', month: 'long', day: 'numeric'};
    const created = new Date(getCreatedAt * 1000).toLocaleString('default', created_options);

    //console.log("order created: " + created);    

    const mail = data.payload.customer.email;

    // Signature is verified, continue to send data to SendGrid
    // Create the email object payload to fire off to SendGrid
    const emailPayload = {
        to: mail,
        from: {
            email: data.payload.merchant.support_email,
            name: 'PokerLighthouse'
        },
        subject: `Thank you for your order ${data.payload.customer.firstname}`,
        text: `Your order number is ${data.payload.customer_reference}`,
        html: `&nbsp;`,

        // SendGrid expects a JSON blog containing the dynamic order data your template will use
        // More information below in 'What's next?' on how to configure your dynamic template in SendGrid
        // The property key names will depend on what dynamic template you create in SendGrid
        dynamic_template_data: {
            total: data.payload.order.subtotal.formatted_with_symbol,
            items: orderLineItems,
            //downloads: downloadData, // TEST
            receipt: true,
            name: data.payload.billing.name,
            address01: data.payload.billing.street,
            city: data.payload.billing.town_city,
            state: data.payload.billing.county_state,
            zip : data.payload.billing.postal_zip_code,
            orderId : orderId,
            //expiry : expiry,
            customerRef : data.payload.customer_reference,
            orderCreated : created,
        },
        template_id: process.env.SENDGRID_TEMPLATE_ID
    };

    let confirmationMail = {};
    try {
        // Call the SendGrid send mail endpoint
        confirmationMail = await sgMailClient.send(emailPayload);
        //console.log(response);

    } catch (err) {
        console.error('Error from function: ', err)
    }

    let list = {};
    try {
        // Call the SendGrid send mail endpoint
        list = await axios.put("https://stoic-payne-386d66.netlify.app/api/AddMailingList?mail="+mail+"&list_id="+process.env.SENDGRID_MAILING_ID_BOOTCAMP)
        //console.log(list);

    } catch (err) {
        console.error('Error from function: ', err)
    }

    const extrafield = data.payload.extra_fields;

    const mailinglist = process.env.MAILINGLIST_EXTRA_FIELD_ID;
    
    const index = extrafield.findIndex( (element) => element.id === mailinglist);

    const signup = extrafield[index].value;
    //const signup = extrafield[0].value;


    //console.log(extrafield,mailinglist, index);


    if (signup) {
        let MailingList = {};
        try {
            // Call the SendGrid send mail endpoint
            MailingList = await axios.post("https://stoic-payne-386d66.netlify.app/api/CheckMailingList?mail="+mail+"&list_id="+process.env.SENDGRID_MAILING_ID_NEWSLETTER_PURCHASE)
            //console.log(list);
    
        } catch (err) {
            console.error('Error from function: ', err)
        }
         
    }


}