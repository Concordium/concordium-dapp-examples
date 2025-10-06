/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const cors = require('cors');

const app = express();

const dataDir = `${__dirname}/data`;
const hostName = process.env.MINT_HOST ?? 'http://localhost:8899';
const collectionsFile = `${__dirname}/collections.json`;

if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

app.use(cors());
app.use(fileUpload());
app.use('/data', express.static(dataDir));

function loadCollections() {
    try {
        const string = fs.readFileSync(collectionsFile);
        return JSON.parse(string);
    } catch (e) {
        return {};
    }
}

const collections = loadCollections();

function addToCollections(collectionid, tokenid) {
    const collection = collections[collectionid] ?? [];
    collection.push(tokenid);
    collections[collectionid] = collection;

    fs.writeFileSync(collectionsFile, JSON.stringify(collections));
    console.log({ collections });
}

app.get('/collections', (req, res) => {
    res.json(collections);
});

app.post('/metadata/:tokenid', (req, res) => {
    console.log(req.body, req.files); // the uploaded file object

    const displayFile = req.files.display;
    displayFile.mv(`${dataDir}/${displayFile.name}`);
    const displayUrl = `${hostName}/data/${displayFile.name}`;

    const json = {
        name: req.body.name,
        description: req.body.description,
        display: {
            url: displayUrl,
        },
        thumbnail: {
            url: displayUrl,
        },
        unique: true,
    };

    const jsonFileName = `${req.params.tokenid}.json`;

    fs.writeFileSync(`${dataDir}/${jsonFileName}`, JSON.stringify(json));

    addToCollections(req.body.address, req.params.tokenid);

    res.json({
        status: 'success',
        url: `${hostName}/data/${jsonFileName}`,
    });
});

console.log('Server started');
app.listen(8899);
