const fs = require('fs');
const cheerio = require('cheerio');

function readFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (error, data) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(data);
        });
    });
}

function writeFile(path, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, 'utf8', error => {
            if (error) {
                reject(error);
                return;
            }

            resolve();
        });
    })
}


async function inlineCss() {
    const htmlFile = './build/index.html';

    const html = await readFile(htmlFile);
    const $ = cheerio.load(html);

    const mainCssLink = $('link[rel=stylesheet][href*=main]');

    const cssText = await readFile('./build/static/css/' + mainCssLink.attr('href').split('/').pop());

    mainCssLink.replaceWith(`<style>${cssText}</style>`);

    await writeFile(htmlFile, $.html());
}

exports.build = () => inlineCss();