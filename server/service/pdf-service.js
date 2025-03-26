const PDFDOCUMENT = require("pdfkit");
const fs = require("fs")

const generatePdf = (req, res)=>{
    const doc = new PDFDOCUMENT()
    
}

module.exports = { generatePdf }