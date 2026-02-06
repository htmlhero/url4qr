import { mkdir, readFile, writeFile } from 'node:fs/promises';
import postcss from 'postcss';
import postcssImport from 'postcss-import';
import cssnano from 'cssnano';
import * as esbuild from 'esbuild';

await mkdir('./dist', { recursive: true });

// Build HTML
const srcHtml = await readFile('./src/index.html', { encoding: 'utf8' });
const timestamp = Date.now();
const destHtml = srcHtml
  .replace('/index.css', `/index.css?t=${timestamp}`)
  .replace('/index.js', `/index.js?t=${timestamp}`);
await writeFile('./dist/index.html', destHtml);
console.log('[Build.js] Copy index.html');

// Build CSS
const srcCss = await readFile('./src/css/index.css', { encoding: 'utf8' });
const { css: destCss } = await postcss([postcssImport, cssnano]).process(srcCss, { from: './src/css/index.css' });
await writeFile('./dist/index.css', destCss);
console.log('[Build.js] Build index.css');

// Build JS
await esbuild.build({
  bundle: true,
  minify: true,
  entryPoints: ['./src/js/index.js'],
  outfile: './dist/index.js',
  target: 'es2020',
});
console.log('[Build.js] Build index.js');
