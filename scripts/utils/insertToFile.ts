import fs from 'node:fs/promises';

export interface InsertToFileOptions {
  filePath: string;
  sectionName: string;
  content: string;
  prefix?: string;
  suffix?: string;
}
export const insertToFile = async (options: InsertToFileOptions) => {
  const maybePrefix = options.prefix ?? '';
  const maybeSuffix = options.suffix ?? '';

  const prevFileContent = await fs.readFile(options.filePath, 'utf8');

  const startComment = `<!-- ${options.sectionName}:START -->`;
  const endComment = `<!-- ${options.sectionName}:END -->`;
  const startIndex = prevFileContent.indexOf(startComment);
  const endIndex = prevFileContent.indexOf(endComment);

  if (startIndex === -1)
    throw new Error(
      `Section start comment with name "${options.sectionName}" not found `
    );
  if (endIndex === -1)
    throw new Error(
      `Section end comment with name "${options.sectionName}" not found `
    );

  const start = prevFileContent.slice(0, startIndex + startComment.length);
  const end = prevFileContent.slice(endIndex);

  const newFileContent =
    `${start}${maybePrefix}` + `${options.content}` + `${maybeSuffix}${end}`;

  await fs.writeFile(options.filePath, newFileContent);
};
