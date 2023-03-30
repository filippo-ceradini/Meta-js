import express from "express";
import rendering from "./utilities/rendering.js";
import bodyParser from "express";
import fs from "fs";

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false}));


//-------------CSS-------------------------------------------------//
const oldCss = "oldButGold.css"
const homepageCss = "homepage.css"
const fullscreen = "zenGarden/fullscreen.css"
const modern = "modern.css"

app.get('/HistoryPages/:name', (req, res) => {
    res.send(rendering.renderPage("./public/pages/HistoryPages/" + req.params.name + ".html", oldCss, "JS Adventure! | " + req.params.name));
});

app.get("/", (req, res) => {
    res.send(rendering.renderPage("./public/pages/homepage.html", homepageCss, "Welcome | JS Adventure!"));
});

app.get("/BuildingPages/:name", (req, res) => {
    res.send(rendering.renderPage("./public/pages/BuildingPages/" + req.params.name + ".html", modern, "JS Adventure! | " + req.params.name));
});

app.get("/NewPages/:name", (req, res) => {
    res.send(rendering.renderPage("./public/pages/NewPages/" + req.params.name, fullscreen, "JS Adventure! | " + req.params.name));
});

app.get("/Login", (req, res) => {
    res.send(rendering.renderPage("./public/pages/login.html", oldCss, "JS Adventure! | Login"));
})


app.post('/Login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;


    if (username === 'a' && password === 'a') {
        // If the user is authenticated, redirect to the dashboard page
        res.send(rendering.renderPage("./public/pages/admin.html", oldCss, "JS Adventure! | Admin Page"));
    } else {
        // If the user is not authenticated, redirect back to the login page with an error message
        res.redirect('/login?error=1');
    }
});

app.post('/admin', (req, res) => {
    // Extract form data
    const title = req.body.title;
    const image = req.body.image;
    const body = req.body.body;
    const code = req.body.code;
    console.log("stocazzo")

    const fileName = `./public/pages/NewPages/${title}.html`;
    const html = `
      <head>
        <title>${title}</title>
      </head>
      <body>
      <br>
        <div class="container">
            <div class="row justify-content-center">
                 <h1>${title}</h1>
            </div>
             <div class="row justify-content-center">
                <img src="${image}">
            </div>
            <p>
               ${body}
            </p>
            <pre>
                <code>
                    ${code}
                </code>
            </pre>
        </div>
      </body>
    </html>
  `;
    fs.writeFile(fileName, html, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log(`File ${fileName} created successfully`);
        }
    });


    // Redirect to new page
    res.redirect(`/`);
});


const PORT = 8080;
app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("Server running on port", PORT);
});
