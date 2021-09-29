// Create the API endpoint function with a req and res parameter
exports.handler = async function(req, res) {

//export default async function handler(req, res) {
    if (!req.body || req.httpMethod !== 'POST') {
        return {
            status: 405,
            headers,
            body: JSON.stringify({
                status: 'Invalid HTTP method',
            }),
        }
    }

    const { data } = JSON.parse(req.body);

    // Request for your merchant information so that you can use your email
    // to include as the 'from' property to send to the SendGrid API
    const merchant = fetch(`${process.env.CHEC_API_URL}/v1/merchants`, {
        headers: {
            'X-Authoriza†ion': process.env.CHEC_SECRET_KEY,
        },
    }).then((response) => response.json);

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
        price: lineItem.line_total.formatted_with_symbol,
    }));

    // Signature is verified, continue to send data to SendGrid
    // Create the email object payload to fire off to SendGrid
    const emailPayload = {
        to: data.payload.customer.email,
        from: merchant.support_email,
        subject: `Thank you for your order ${data.payload.customer.firstname}`,
        text: `Your order number is ${data.payload.customer_reference}`,
        // SendGrid expects a JSON blog containing the dynamic order data your template will use
        // More information below in 'What's next?' on how to configure your dynamic template in SendGrid
        // The property key names will depend on what dynamic template you create in SendGrid
        dynamic_template_data: {
            total: data.payload.order.subtotal.formatted_with_symbol,
            items: orderLineItems,
            receipt: true,
            name: data.payload.shipping.name,
            address01: data.payload.shipping.street,
            city: data.payload.shipping.town_city,
            state: data.payload.shipping.county_state,
            zip : data.payload.shipping.postal_zip_code,
            orderId : data.payload.id,
        },
        // In addition to specifying the dynamic template data, you need to specify the template ID. This comes from your SendGrid dashboard when you create you dynamic template
    // https://mc.sendgrid.com/dynamic-templates
        template_id: 'd-e319802399914baba04f8dd3c82246cd'
    }

    let response = {};
    try {
        // Call the SendGrid send mail endpoint
        response = await sgMailClient.send(emailPayload);
        return {
            statusCode: 200,
            headers,
            body: 'Email sent!'
        }
    } catch (err) {
        console.error('Error', err)
    }
    // Return the response from the request
    return res.status(200).json(response);
}