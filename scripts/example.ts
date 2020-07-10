import * as dotenv from 'dotenv';
dotenv.config();

import { promises as fs } from 'fs';
import { join } from 'path';

import insertContent from './insertContent';
import exampleFile from '../examples/example';

const examplePath = join(__dirname, '../examples/example.js');
const runkitPath = join(__dirname, '../examples/runkit.js');

(async () => {

  const example = await fs.readFile(examplePath, 'utf8')
    .then(exampleText => exampleText.replace(/\.\.\/lib/g, 'r6api.js'));

  await fs.writeFile(runkitPath, example);
  await insertContent('example', example, { style: 'codeBlock' });

  const exampleOutput = await exampleFile();

  await insertContent('example-output', exampleOutput, { style: 'codeBlock', lang: '' });

  process.exit();

})();
