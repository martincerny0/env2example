import fs from 'fs';

function inferPlaceholder(value) {
  if (/^\d+(\.\d+)?$/.test(value)) return '<number>';
  if (/^(true|false)$/i.test(value)) return '<boolean>';
  return '<string>';
}

function isValidKey(key) {
  return /^[A-Z_][A-Z0-9_]*$/i.test(key);
}

export function generateEnvExample(inputPath, outputPath, options = {}) {
  const lines = fs.readFileSync(inputPath, 'utf-8').split('\n');

  const exampleLines = [];

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (trimmed === '' || trimmed.startsWith('#')) {
      exampleLines.push(line);
      return;
    }

    if (!trimmed.includes('=')) {
      throw new Error(`Syntax error on line ${index + 1}: "${line}" – missing "="`);
    }

    const [rawKey, ...rest] = trimmed.split('=');
    const key = rawKey.trim();
    const value = rest.join('=').trim();

    if (!isValidKey(key)) {
      throw new Error(`Invalid key name on line ${index + 1}: "${key}"`);
    }

    if (options.clean) {
      exampleLines.push(`${key}=""`);
    } else {
      const placeholder = inferPlaceholder(value);
      exampleLines.push(`${key}=${placeholder}`);
    }
  });

  fs.writeFileSync(outputPath, exampleLines.join('\n'));
}
