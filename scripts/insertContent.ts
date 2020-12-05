import { promises as fsp } from 'fs';

interface IOptions {
  prefix?: string;
  suffix?: string;
  newLine?: boolean;
  style?: 'none' | 'codeBlock' | 'hiddenCodeBlock';
  codeBlockLang?: string;
  hiddenCodeBlockSummary?: string;
}

export default async (
  path: string, name: string, content: string, options: IOptions = {}
) => {

  const {
    prefix = '', suffix = '', style = 'none', codeBlockLang = '', hiddenCodeBlockSummary = ''
  } = options;
  const newLine = options.newLine ? '\n' : '';

  const fileContent = await fsp.readFile(path, 'utf8')
    .catch(err => { throw new Error(err); });

  const startComment = `<!-- START_SECTION:${name} -->`;
  const endComment = `<!-- END_SECTION:${name} -->`;
  const startIndex = fileContent.indexOf(startComment);
  const endIndex = fileContent.indexOf(endComment);

  if (startIndex < 0 || endIndex < 0)
    throw new Error(`Comment with name "${name}" not found`);

  const firstHalf = fileContent.slice(0, startIndex + startComment.length);
  const secondHalf = fileContent.slice(endIndex);

  const getStyledContent = () => ({
    none: content,
    codeBlock: `\`\`\`${codeBlockLang}\n${content}\n\`\`\``,
    hiddenCodeBlock:
      '<details>\n' +
      `<summary>${hiddenCodeBlockSummary}</summary>\n\n` +
      `\`\`\`${codeBlockLang}\n${content}\n\`\`\`\n\n` +
      '</details>'
  }[style]);

  await fsp.writeFile(
    path,
    `${firstHalf}${newLine}${prefix}${getStyledContent()}${suffix}${newLine}${secondHalf}`
  )
    .catch(err => { throw new Error(err); });

};
