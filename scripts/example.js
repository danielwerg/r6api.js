require('dotenv').config();
const { promises: { readFile, writeFile } } = require('fs');
const { join } = require('path');

const insertContent = require('./insertContent.js');

const examplePath = join(__dirname, '../example.js');
const runkitPath = join(__dirname, '../runkit.js');

(async () => {

  const example = await readFile(examplePath, 'utf8')
    .then(exampleText => exampleText.replace(/\.\/lib/g, 'r6api.js'));

  writeFile(runkitPath, example);
  insertContent('example', example, { style: 'codeBlock' });

  const exampleOutput = await require(examplePath)();

  await insertContent('exampleOutput', exampleOutput, { style: 'codeBlock', lang: '' });

  process.exit();

})();
