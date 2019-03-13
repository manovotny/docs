const fs = require('fs')
const cheerio = require('cheerio')
const globby = require('globby')

;(async () => {
  const files = await globby([
    'out/guides/custom-next-js-server-to-routes/index.html'
  ])
  files.forEach(file => {
    const content = fs.readFileSync(file)
    const $ = cheerio.load(content)
    console.log($.text())
  })
})()
