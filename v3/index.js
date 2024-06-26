const express = require('express');
const path = require('path');
const app = express();
const Parser = require('rss-parser');
const bodyParser = require('body-parser');

const parser = new Parser();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/rss', async (req, res) => {
    let feed = await parser.parseURL(req.body.url);
    let items = feed.items.slice(0, 10);

    let html = items.map(item => `
    <h3><a href="${item.link}">${item.title}</a></h3>
    <p>${item.contentSnippet}</p>
    `).join('');

    res.send(html);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
