import {PDFDocument, rgb, StandardFonts  } from 'pdf-lib';


// getPDF.js
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

//http://localhost:3000/api/getPDF?id=ord_DWy4oGyj2Ml6Jx

// https://commercejs.com/docs/api/?javascript#get-digital-package
// GET /v1/orders/{order_id}/fulfillments/digital/packages/{package_id}

// https://commercejs.com/docs/api/?javascript#list-digital-packages-in-an-order
// GET /v1/orders/{order_id}/fulfillments/digital/packages

// https://commercejs.com/docs/api/?javascript#get-order
// GET /v1/orders/{order_id}



export default async function handler(req, res) {


    try {

        const {id} = req.query;
        const jsonData = await getAPI(id);

        const fullname = jsonData.billing.name;
        const access_url = jsonData.fulfillment.digital.downloads[0].packages[0].access_link;

        const ref_id = jsonData.customer_reference.split("-").pop(); // remove customer_reference prefix

        // add ref_id to filename
        let filename  = jsonData.fulfillment.digital.downloads[0].packages[0].name;
        filename = filename.split(".").shift(); // Remove file extention
        filename = filename + "-(" + ref_id + ").pdf";

        const pdfBuffer = await modifyPDF(fullname, access_url, ref_id);
        res.status(200); 
        res.setHeader('Content-Type', 'application/pdf');  // Displsay
        res.setHeader('Content-Disposition', 'attachment; filename='+filename);
        res.send(pdfBuffer);
        
    } catch (e) {
        console.log(e);
    }

}



export async function getAPI(id) {

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
        
        const jsonData = await response.json()

        let is_expired = jsonData.fulfillment.digital.downloads[0].is_expired; // (if not exist) or (if exists and true) = True, (If exist and false) = True
        if ( (typeof is_expired === 'undefined') || (is_expired == false) ) { 
            is_expired = false;
        } else {
            is_expired = true;
            res.status(200).send({
                message:
                "Link has Expired",
            });
        }
    
        return jsonData;

    } catch (e) {
        console.log(e);
    }

}



export async function modifyPDF(fullname, access_url, ref_id) {

    try {

        const checSecretAPIKey = process.env.CHEC_SECRET_KEY;
        let headers = {
            "X-Authorization": checSecretAPIKey,
            "Accept": "application/json",
            "Content-Type": "application/json",
        };

    
        const existingPdfBytes = await fetch(access_url, {
            method: "GET",
            headers: headers,
        }).then((res) => res.arrayBuffer());
        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);


        const watermark = fullname + " (OrderID: " + ref_id + ")";

        
        // Set Document Metadata
        pdfDoc.setSubject(watermark);

        // Get pages
        const pages = pdfDoc.getPages();
    
        // Iterate every page, skip first
        //pages.slice(1).forEach(page => {
        pages.forEach(page => {
    
        
        // Get the width and height of the page
        const {
            width,
            height
        } = page.getSize()
    
        // Watermark the page
        page.drawText(watermark, {
                x: 70,
                y: 8,
                size: 10,
                font: helveticaFont,
                color: rgb(0.95, 0.1, 0.1),
        })
        })
            
        const pdfBytes = await pdfDoc.save();
        return Buffer.from(pdfBytes.buffer, 'binary');

    } catch (e) {
        console.log(e);
    }
 
}









/* TODO */
/*

1) Error handling 
   -> link expired
   -> api download error x2

*/ 