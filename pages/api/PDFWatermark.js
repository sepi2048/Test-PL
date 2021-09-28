import {PDFDocument, rgb, StandardFonts  } from 'pdf-lib';

// http://localhost:3000/api/PDFWatermark?id=123&firstname=John&lastname=Doe

export async function modifyPDF(firstname, lastname, id) {

    const fullname = firstname + " " + lastname;
    const existingPdfBytes = await fetch("https://pdf-lib.js.org/assets/us_constitution.pdf").then((res) => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const watermark = fullname + " (OrderID: " + id + ")";

    // Set Document Metadata
    pdfDoc.setSubject(watermark);

    // Get pages
    const pages = pdfDoc.getPages();

    // Iterate every page, skip first
    pages.slice(1).forEach(page => {
    //pages.forEach(page => {
  
      
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
 
}


export default async function handler(req, res) {

    const filename = "test.pdf";
    const {id, firstname, lastname} = req.query;
    const pdfBuffer = await modifyPDF(firstname, lastname, id);
    res.status(200); 
    res.setHeader('Content-Type', 'application/pdf');  // Displsay
    res.setHeader('Content-Disposition', 'attachment; filename='+filename);
    res.send(pdfBuffer);

}



/*
GOAL: API-link: as a href from a link that will trigger an automatic download of a PDF with a custom watermark generated from API URL parameters
1) Error handelinng 
   -> link expired
   -> api download error x2
*/
