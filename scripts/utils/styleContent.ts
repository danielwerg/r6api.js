interface StyleContentOptions {
  content: string;
  style: 'codeBlock' | 'hiddenCodeBlock';
  /** Defaults to `''` (none) */
  codeBlockLang?: string;
  /** Only used when `style` option is `'hiddenCodeBlock'`. Defaults to `'Show'` */
  hiddenCodeBlockSummary?: string;
}
export const styleContent = ({
  content,
  style,
  codeBlockLang = '',
  hiddenCodeBlockSummary = 'Show'
}: StyleContentOptions) =>
  ({
    codeBlock: `\`\`\`${codeBlockLang}\n${content}\n\`\`\``,
    hiddenCodeBlock:
      '<details>\n' +
      `<summary>${hiddenCodeBlockSummary}</summary>\n\n` +
      `\`\`\`${codeBlockLang}\n${content}\n\`\`\`\n\n` +
      '</details>'
  }[style]);
