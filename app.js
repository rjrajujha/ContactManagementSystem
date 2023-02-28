const express = require('express');
const app = express();

// Add Access Control Allow Origin headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    );
    next();
});

app.use('/v1/contacts', require("./routes/contacts"));

app.get('/*', (req, res) => {
    res.writeHead(301, { Location: "https://github.com/rjrajujha" });
    res.end();
})

module.exports = app;