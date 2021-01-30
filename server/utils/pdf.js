const ejs = require('ejs')
const puppeteer = require('puppeteer')
const { Buffer } = require('buffer')
const { PDFDocument } = require('pdf-lib')

async function createPDF({ template, data, output, landscape = false, title = 'Laporan', format = 'A4' }) {
  const content = await ejs.renderFile(template, data)

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
    format,
    path: output || null,
    landscape,
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
