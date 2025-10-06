/* eslint-disable */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');

const port = 8080;
const app = express();
app.use(express.static(`${__dirname}/dist`));
app.use(express.static(`${__dirname}/public`));

app.get('/*', (req, res) => {
    res.sendFile(`${__dirname}/dist/index.html`);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
