/* eslint-disable no-console */
/* Good resource on fs and promises
 https://puruvj.dev/blog/fs-promises
 */

const path = require('path');
const { writeFile, readFile, unlink } = require('fs').promises;

async function injectCss() {
  const template = await readFile(
    path.join(process.cwd(), '/src/hbs/default-template.hbs'),
  );

  const css = await readFile(
    path.join(process.cwd(), '/assets/built/critical.css'),
  );

  const inlinedCss = template
    .toString()
    .replace('{{!-- critical-css --}}', `<style>${css.toString()}</style>`);
  await writeFile('./default.hbs', inlinedCss.toString());

  unlink(path.join(process.cwd(), '/assets/built/critical.css'), (err) => {
    if (err) {
      console.log(err);
    }
  });

  console.log('🥳 Inlined critical css');
}

injectCss();