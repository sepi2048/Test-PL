import React, { useEffect, useState } from 'react';

import {PDFDocument, rgb, StandardFonts  } from 'pdf-lib';

import Button from "../../components/Button";


const WatermarkPDF = (props) => {
  const [pdfInfo, setPdfInfo] = useState([]);

  const trimurl = new URL(props.url);

  const heroku = "https://cors-anywhere.herokuapp.com/"+props.url;

  const filename = props.filename.split(".").shift(); // Remove file extention
  const order_id = props.order_id.split("-").pop(); // remove order_id prefix

  const modifyPdf = async () => {

    const existingPdfBytes = await fetch(heroku).then((res) => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    
    const watermark = props.fullname + " (OrderID: " + order_id + ")";
    
    
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


    // Blob link is a special url that points to an object in the browser's memory
    var bytes = new Uint8Array(pdfBytes); 
    var blob = new Blob([bytes], { type: "application/pdf" });
    const anchor = document.createElement('a');
    anchor.download = filename + "-(" + order_id + ").pdf";
    anchor.href = (window.webkitURL || window.URL).createObjectURL(blob);
    anchor.dataset.downloadurl = ['text/plain', anchor.download, anchor.href].join(':');
    anchor.click();

    console.log(URL.createObjectURL(blob));
  };
  
  return (

    <><button key={props.index} onClick={modifyPdf} target="_blank" rel="noopener noreferrer" type="button" className={"appearance-none leading-none p-1 md:p-2 lg:p-3 text-lg md:text-xl"}> Download {props.filename}</button></>

  );
};

export default WatermarkPDF;

