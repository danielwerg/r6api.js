/* eslint-disable complexity */
export type MarkdownTableTable = string[][];

export interface MarkdownTableOptions {
  /**
   * One style for all columns, or styles for their respective columns.
   * `''` (non explicit) by default
   */
  align?: MarkdownTableOptionsAlign | MarkdownTableOptionsAlign[];
  /**  Whether to add a space of padding between delimiters and cells. `true` by default*/
  padding?: boolean;
  /** Whether to align the delimiters (`| - |`). `true` by default */
  alignDelimiters?: boolean;
  /**
   *   Function to detect the length of table cell content.
   *   This is used when aligning the delimiters (`|`) between table cells.
   *   Full-width characters and emoji mess up delimiter alignment when viewing
   *   the markdown source.
   *   To fix this, you can pass this function, which receives the cell content
   *   and returns its “visible” size.
   *   Note that what is and isn’t visible depends on where the text is displayed.
   *
   */
  stringLength?: (string: string) => number;
}
export type MarkdownTableOptionsAlign = '' | 'l' | 'c' | 'r';

/** CREDIT: https://github.com/wooorm/markdown-table */
export const markdownTable = (
  table: MarkdownTableTable,
  options?: MarkdownTableOptions
) => {
  const defaultOptions: MarkdownTableOptions = {
    align: '',
    padding: true,
    alignDelimiters: true,
    stringLength: (string: string) => string.length
  };
  const { align, padding, alignDelimiters, stringLength } = {
    ...defaultOptions,
    ...options
  };

  const cellMatrix: string[][] = [];
  const sizeMatrix: number[][] = [];
  const longestCellByColumn: number[] = [];
  let mostCellsPerRow = 0;
  let rowIndex = -1;

  while (++rowIndex < table.length) {
    const row: string[] = [];
    const sizes: number[] = [];
    let columnIndex = -1;

    if (table[rowIndex]!.length > mostCellsPerRow)
      mostCellsPerRow = table[rowIndex]!.length;

    while (++columnIndex < table[rowIndex]!.length) {
      const cell = table[rowIndex]![columnIndex]!;

      if (alignDelimiters) {
        const size = stringLength!(cell);
        sizes[columnIndex] = size;

        if (
          longestCellByColumn[columnIndex] === undefined ||
          size > longestCellByColumn[columnIndex]!
        ) {
          longestCellByColumn[columnIndex] = size;
        }
      }

      row.push(cell);
    }

    cellMatrix[rowIndex] = row;
    sizeMatrix[rowIndex] = sizes;
  }

  let columnIndex = -1;
  const row: string[] = [];
  const sizes: number[] = [];

  while (++columnIndex < mostCellsPerRow) {
    const alignCurrent = Array.isArray(align) ? align[columnIndex] : align;
    let before = '';
    let after = '';

    if (alignCurrent === 'l') {
      before = ':';
    } else if (alignCurrent === 'c') {
      before = ':';
      after = ':';
    } else if (alignCurrent === 'r') {
      after = ':';
    }

    let size = alignDelimiters
      ? Math.max(
          1,
          longestCellByColumn[columnIndex]! - before.length - after.length
        )
      : 1;

    const cell = before + '-'.repeat(size) + after;

    if (alignDelimiters) {
      size = before.length + size + after.length;

      if (size > longestCellByColumn[columnIndex]!)
        longestCellByColumn[columnIndex] = size;

      sizes[columnIndex] = size;
    }

    row[columnIndex] = cell;
  }

  cellMatrix.splice(1, 0, row);
  sizeMatrix.splice(1, 0, sizes);

  const lines: string[] = [];

  rowIndex = -1;

  while (++rowIndex < cellMatrix.length) {
    const row = cellMatrix[rowIndex];
    const sizes = sizeMatrix[rowIndex];
    columnIndex = -1;
    const line: string[] = [];

    while (++columnIndex < mostCellsPerRow) {
      const cell = row![columnIndex] ?? '';
      let before = '';
      let after = '';

      if (alignDelimiters) {
        const size =
          longestCellByColumn[columnIndex]! - (sizes![columnIndex] ?? 0);
        const alignCurrent = Array.isArray(align) ? align[columnIndex] : align;

        if (alignCurrent === 'r') {
          before = ' '.repeat(size);
        } else if (alignCurrent === 'c') {
          if (size % 2) {
            before = ' '.repeat(size / 2 + 0.5);
            after = ' '.repeat(size / 2 - 0.5);
          } else {
            before = ' '.repeat(size / 2);
            after = before;
          }
        } else {
          after = ' '.repeat(size);
        }
      }

      if (!columnIndex) line.push('|');

      if (padding && !(!alignDelimiters && cell === '')) line.push(' ');

      if (alignDelimiters) line.push(before);

      line.push(cell);

      if (alignDelimiters) line.push(after);

      if (padding) line.push(' ');

      line.push('|');
    }

    lines.push(line.join(''));
  }

  return lines.join('\n');
};
