const { promises: { readFile, writeFile } } = require('fs');
const { join } = require('path');

module.exports = async (name, content, options = {}) => {

  const { style = 'hiddenCodeBlock', lang = 'js'} = options;

  const READMEFilePath = join(__dirname, '../README.md');
  const READMEFile = await readFile(READMEFilePath, 'utf8');

  const startComment = `<!-- ${name}-start -->`;
  const endComment = `<!-- ${name}-end -->`;

  const startIndex = READMEFile.indexOf(startComment);
  const endIndex = READMEFile.indexOf(endComment);

  if (startIndex < 0 || endIndex < 0)
    return console.log(`Comment with name \`${name}\` not found`);

  const firstPart = READMEFile.slice(0, startIndex + startComment.length);
  const secondPart = READMEFile.slice(endIndex, READMEFile.length);

  const STYLES = {
    none: `\n${content}\n`,
    codeBlock: `\n\`\`\`${lang}\n${content}\n\`\`\`\n`,
    hiddenCodeBlock:
      '\n<details>\n<summary>Output</summary>\n' +
      `\n\`\`\`${lang}\n${content}\n\`\`\`\n` +
      '\n</details>\n'
  };

  const contentFormated = firstPart + STYLES[style] + secondPart;

  return writeFile(READMEFilePath, contentFormated);

};
