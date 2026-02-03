import esbuild, { BuildOptions } from 'esbuild';
import { htmlPlugin } from '@craftamap/esbuild-plugin-html';
import svgrPlugin from 'esbuild-plugin-svgr';
import fs from 'fs';

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
};

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async () => {
    try {
        if (watch) {
            const ctx = await esbuild.context(config);
            await ctx.watch();
            console.log('watching for changes...');
        } else {
            // AWAIT THE BUILD
            await esbuild.build(config);
            console.log('Build completed successfully.');
            // Then the script ends naturally here with exit code 0
        }
    } catch (error) {
        console.error('Build failed:', error);
        process.exit(1);
    }
})();
