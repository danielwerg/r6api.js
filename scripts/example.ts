import * as dotenv from 'dotenv';
dotenv.config();

import { promises as fsp } from 'fs';
import { join } from 'path';

import { insertContent } from './utils';
import exampleFile from '../examples/example';

(async () => {

  const examplePath = join(__dirname, '../examples/example.js');
  const runkitPath = join(__dirname, '../examples/runkit.js');
  const readmePath = join(__dirname, '../readme.md');

  const example = await fsp.readFile(examplePath, 'utf8')
    .then(exampleText => exampleText.replace(/\.\.\/lib/g, 'r6api.js'))
    .catch(err => { throw new Error(err); });


  await fsp.writeFile(runkitPath, example).catch(err => { throw new Error(err); });


  await insertContent(
    readmePath, 'EXAMPLE', example,
    { style: 'codeBlock', codeBlockLang: 'js', newLine: true }
  ).catch(err => console.error(err));


  const exampleOutput = await exampleFile();

  await insertContent(
    readmePath, 'EXAMPLE_OUTPUT', exampleOutput,
    { style: 'codeBlock', newLine: true }
  ).catch(err => console.error(err));

  process.exit();

})();
