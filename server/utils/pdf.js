const ejs = require('ejs')
const puppeteer = require('puppeteer')
const fs = require('fs')
const { Buffer } = require('buffer')
const { PDFDocument } = require('pdf-lib')

async function createPDF({ template, data, output, title = 'Laporan' }) {
  const content = ejs.render(fs.readFileSync(template).toString(), data)

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-3d-apis',
      '--disable-web-security',
      '--font-render-hinting=none',
    ],
  })
  const page = await browser.newPage()
  await page.goto('data:text/html,' + content, { waitUntil: 'networkidle0' })
  let pdf = await page.pdf({
    format: 'A4',
    path: output || null,
    margin: {
      top: '20px',
      bottom: '20px',
      left: '20px',
      right: '20px',
    },
  })

  browser.close()
  pdfdoc = await PDFDocument.load(pdf)
  pdfdoc.setTitle(title)
  pdf = await pdfdoc.save()
  return Buffer.from(pdf)
}

module.exports = {
  createPDF,
}
