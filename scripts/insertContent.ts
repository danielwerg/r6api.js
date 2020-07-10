import { promises as fs} from 'fs';
import { join } from 'path';

interface IOptions {
  style?: string;
  lang?: string;
}

export default async (name: string, content: string, options: IOptions = {}) => {

  const { style = 'hiddenCodeBlock', lang = 'js'} = options;

  const readmeFilePath = join(__dirname, '../README.md');
  const readmeFile = await fs.readFile(readmeFilePath, 'utf8')
    .catch(err => console.log(err));
  if (!readmeFile) return console.log('ReadMe file not found');

  const startComment = `<!-- ${name}-start -->`;
  const endComment = `<!-- ${name}-end -->`;

  const startIndex = readmeFile.indexOf(startComment);
  const endIndex = readmeFile.indexOf(endComment);

  if (startIndex < 0 || endIndex < 0)
    return console.log(`Comment with name \`${name}\` not found`);

  const firstPart = readmeFile.slice(0, startIndex + startComment.length);
  const secondPart = readmeFile.slice(endIndex, readmeFile.length);

  const STYLES = {
    none: `\n${content}\n`,
    codeBlock: `\n\`\`\`${lang}\n${content}\n\`\`\`\n`,
    hiddenCodeBlock:
      '\n<details>\n<summary>Output</summary>\n' +
      `\n\`\`\`${lang}\n${content}\n\`\`\`\n` +
      '\n</details>\n'
  };

  const contentFormated = firstPart + STYLES[style] + secondPart;

  await fs.writeFile(readmeFilePath, contentFormated)
    .catch(err => console.log(err));

};
