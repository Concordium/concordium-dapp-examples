import * as ccdJsGen from '@concordium/ccd-js-gen';
import { Command } from 'commander';
import { globIterate } from 'glob';
import fs from 'node:fs/promises';
import path from 'node:path';
import url from 'node:url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

interface Options {
    /** Smart contract module to generate clients from */
    module: string;
}

const program = new Command();
program
    .name('ccd-js-gen')
    .requiredOption(
        '-m, --module <module-file>',
        'Path to the smart contract module to generate clients from.',
        path.resolve(
            __dirname,
            '../../../contracts/concordium-governance-committee-election/concordium-out/module.wasm.v1',
        ),
    )
    .parse(process.argv);

const options = program.opts<Options>();
const outDirPath = './src/__generated__/election-contract'; // The directory to use for the generated files.

// Generate the smart contract clients from module source.
console.info('Generating smart contract module clients.');
await ccdJsGen.generateContractClientsFromFile(options.module, outDirPath, { output: 'TypeScript' });

for await (const filename of globIterate('**/__generated__/**/*.ts')) {
    const file = await fs.readFile(filename, 'utf8');
    const content = '// @ts-nocheck\n' + file;
    await fs.writeFile(filename, content);
}

console.info('Code generation was successful.');
