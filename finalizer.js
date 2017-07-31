const fs = require('fs')
const crypto = require('crypto')

const INNER_SCRIPT = fs.readFileSync('inner-script.js', 'utf8')

const hash = crypto.createHash('sha256').update(INNER_SCRIPT).digest('base64')

const manifest = fs.readFileSync('manifest-template.json', 'utf8').split('HASH').join(hash)

fs.writeFileSync('manifest.json', manifest)

const main = fs.readFileSync('main-template.js', 'utf8').split('INNER_SCRIPT').join(JSON.stringify(INNER_SCRIPT))

fs.writeFileSync('main.js', main)
