import { promises as fsp, PathLike } from 'fs';

export const isFileExists = async (path: PathLike) =>
  !!(await fsp.stat(path).catch(() => false));
