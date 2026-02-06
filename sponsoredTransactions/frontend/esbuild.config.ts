/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import esbuild, { BuildOptions } from 'esbuild';
import { htmlPlugin } from '@craftamap/esbuild-plugin-html';
import svgrPlugin from 'esbuild-plugin-svgr';
import fs from 'fs';

if (process.env.SMART_CONTRACT_INDEX === undefined || Number.isNaN(process.env.SMART_CONTRACT_INDEX)) {
    throw Error('Environmental variable SMART_CONTRACT_INDEX needs to be defined and set to a number');
}

const watch = Boolean(process.env.WATCH);

const main = 'src/index.tsx';

const htmlTemplate = fs.readFileSync('src/index.html').toString();
const htmlOut = 'index.html';

const config: BuildOptions = {
    entryPoints: [main],
    entryNames: '[name]',
    bundle: true,
    minify: true,
    metafile: true,
    logLevel: 'info',
    sourcemap: 'inline',
    target: ['chrome67'],
    outdir: 'dist',
    plugins: [
        htmlPlugin({
            files: [
                {
                    entryPoints: [main],
                    filename: htmlOut,
                    htmlTemplate,
                },
            ],
        }),
        svgrPlugin(),
    ],
    // https://github.com/evanw/esbuild/issues/73#issuecomment-1204706295
    define: {
        global: 'window',
        'process.env.SMART_CONTRACT_INDEX': process.env.SMART_CONTRACT_INDEX,
    },
};

(async () => {
    if (watch) {
        const ctx = await esbuild.context(config);
        await ctx.watch();
        console.log('watching for changes...');
    } else {
        esbuild.build(config).catch(() => process.exit(1));
    }
})();
