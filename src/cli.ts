import fs from 'node:fs/promises';
import path from 'node:path';
import url from 'node:url';

import { Option, program } from 'commander';

export interface CliOptions {
  inputDirectory: string;
  outputDirectory: string;
  ignoreFilePath: string;
}

export async function readCliArguments() {
  // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
  const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
  const packageJsonPath = path.join(__dirname, '../package.json');
  const packageJson = JSON.parse(
    await fs.readFile(packageJsonPath, 'utf8')
  ) as {
    version: string;
  };

  program.version(
    packageJson.version,
    '-v, --version',
    'Display version number'
  );

  program.requiredOption(
    '-i, --inputDirectory <inputDirectory>',
    'Input directory'
  );

  program.requiredOption(
    '-o, --outputDirectory <outputDirectory>',
    'Output directory'
  );

  program.addOption(
    new Option(
      '--ignoreFilePath <ignoreFilePath>',
      'Backup ignore file path'
    ).default('.backupignore')
  );

  return program.parse().opts<CliOptions>();
}
