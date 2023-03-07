export * from './insertToFile';
export * from './markdownTable';
export * from './styleContent';

import fs from 'node:fs/promises';

export const isPathExists = async (path: string) =>
  !!(await fs.stat(path).catch(() => false));

export const camelToTitle = (camelCase: string) =>
  camelCase
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, first => first.toUpperCase());
