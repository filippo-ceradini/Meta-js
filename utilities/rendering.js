import fs from "fs";


function renderPage(page, cssString, tabTitle) {
    page = readPage(page)
    let pagelinks =[]
    fs.readdir("./public/pages/NewPages/", (err, files) => {
        if (err) {
            console.error(err);
        } else {
            pagelinks.push(files)
            console.log(pagelinks)
        }
    });
    const navbar = fs.readFileSync("./public/components/navbar.html").toString()
        .replace("$CSS_FILENAME", cssString)
        .replace("$TAB_TITLE", tabTitle)
    console.log()
    const footer = fs.readFileSync("./public/components/footer.html").toString()
        .replace("$FOOTER_YEAR", `© ${new Date().getFullYear()}`);
    return navbar + page + footer;
}

function readPage(pagePath) {
    return fs.readFileSync(pagePath).toString();
}


export default {
    renderPage,
    readPage
};
