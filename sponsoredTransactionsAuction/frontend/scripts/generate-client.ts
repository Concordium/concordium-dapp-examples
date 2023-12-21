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

const program_cis2 = new Command();
program_cis2
    .name('ccd-js-gen')
    .requiredOption(
        '-m, --module <module-file>',
        'Path to the smart contract module to generate clients from.',
        path.resolve(__dirname, '../contracts/cis2_multi.wasm.v1'),
    )
    .parse(process.argv);

const options_cis2 = program_cis2.opts<Options>();
const outDirPath_cis2 = './generated/'; // The directory to use for the generated files.

// Generate the smart contract clients from module source.
console.info('Generating smart contract module clients for cis2 token contract.');
await ccdJsGen.generateContractClientsFromFile(options_cis2.module, outDirPath_cis2, { output: 'TypeScript' });

const program_auction = new Command();
program_auction
    .name('ccd-js-gen')
    .requiredOption(
        '-m, --module <module-file>',
        'Path to the smart contract module to generate clients from.',
        path.resolve(__dirname, '../contracts/sponsored_tx_enabled_auction.wasm.v1'),
    )
    .parse(process.argv);

const options_auction = program_auction.opts<Options>();
const outDirPath_auction = './generated/'; // The directory to use for the generated files.

// Generate the smart contract clients from module source.
console.info('Generating smart contract module clients for auction contract.');
await ccdJsGen.generateContractClientsFromFile(options_auction.module, outDirPath_auction, { output: 'TypeScript' });

for await (const filename of globIterate('**/generated/**/*.ts')) {
    const file = await fs.readFile(filename, 'utf8');
    const content = '// @ts-nocheck\n' + file;
    await fs.writeFile(filename, content);
}

console.info('Code generation was successful.');
