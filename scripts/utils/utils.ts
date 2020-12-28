import { promises as fsp } from 'fs';

export const isFileExists = async (path: string) =>
  !!(await fsp.stat(path).catch(() => false));
