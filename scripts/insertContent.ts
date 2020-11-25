import { promises as fs} from 'fs';
import { join } from 'path';

interface IOptions {
  style?: 'none' | 'codeBlock' | 'hiddenCodeBlock';
  lang?: string;
}

export default async (name: string, content: string, options: IOptions = {}) => {

  const { style = 'hiddenCodeBlock', lang = 'js'} = options;

  const readmeFilePath = join(__dirname, '../readme.md');
  const readmeFile = await fs.readFile(readmeFilePath, 'utf8')
    .catch(err => console.log(err));
  if (!readmeFile) return console.log('readme file not found');

  const startComment = `<!-- START:${name} -->`;
  const endComment = `<!-- END:${name} -->`;

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

  await fs.writeFile(readmeFilePath, firstPart + STYLES[style] + secondPart)
    .catch(err => console.log(err));

};
