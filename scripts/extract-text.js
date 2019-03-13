const fs = require('fs')
const cheerio = require('cheerio')
const globby = require('globby')

;(async () => {
  const files = await globby([
    '/Users/mnovotny/Developer/docs/out/docs/v1/continuous-integration/travis/index.html'
  ])
  files.forEach(file => {
    const content = fs.readFileSync(file)
    const $ = cheerio.load(content)
    const headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
    const structure = []

    $('main aside')
      .next()
      .find(`${headings.join(', ')}, p`)
      .each((index, element) => {
        if (headings.includes(element.tagName)) {
          structure.push({
            section: $(element).text(),
            content: []
          })
        } else {
          structure[structure.length - 1].content.push($(element).text())
        }
      })

    console.log(structure)
  })
})()
