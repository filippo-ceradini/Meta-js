import fs from "fs";

function renderPage(page, cssString, tabTitle) {
    page = readPage(page)
    let pageLinks = fs.readdirSync("./public/pages/NewPages/");
    const stringLinks = pageLinks.map(function(page) {
        return `<a class="dropdown-item" href="/NewPages/${page}">${page.replace(".html","")}</a>`;
    });
    let navbar = fs.readFileSync("./public/components/navbar.html").toString()
        .replace("$CSS_FILENAME", cssString)
        .replace("$TAB_TITLE", tabTitle)
    if (stringLinks.length > 0) {
        navbar = navbar.replace("$POSTS_ENTRIES", stringLinks.join(""));
    } else {navbar = navbar.replace("$DISPLAY_POSTS", "d-none")}
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
