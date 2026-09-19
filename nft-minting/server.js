/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();

const dataDir = path.join(__dirname, 'data');
const hostName = process.env.MINT_HOST ?? 'http://localhost:8899';
const collectionsFile = path.join(__dirname, 'collections.json');

if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

app.use(cors());
app.use(fileUpload());
app.use('/data', express.static(dataDir));

function sanitizeFileName(name) {
    // Allow only alphanumeric, dash, underscore, dot
    const sanitized = name.replace(/[^a-zA-Z0-9._-]/g, '');
    // Prevent directory traversal attempts
    return path.basename(sanitized);
}

function safeJoin(base, target) {
    const resolved = path.resolve(base, target);
    if (!resolved.startsWith(path.resolve(base))) {
        throw new Error('Path traversal attempt detected');
    }
    return resolved;
}

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
    console.log(req.body, req.files);

    const displayFile = req.files?.display;
    if (!displayFile) {
        return res.status(400).json({ status: 'error', message: 'No display file provided' });
    }

    const safeFileName = sanitizeFileName(displayFile.name);
    const displayPath = safeJoin(dataDir, safeFileName);

    displayFile.mv(displayPath);
    const displayUrl = `${hostName}/data/${safeFileName}`;

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

    const safeTokenId = sanitizeFileName(req.params.tokenid);
    const jsonFileName = `${safeTokenId}.json`;
    const jsonPath = safeJoin(dataDir, jsonFileName);

    fs.writeFileSync(jsonPath, JSON.stringify(json));

    // Sanitize address used as collection key (not a path, but keep it clean)
    const safeAddress = sanitizeFileName(req.body.address);
    addToCollections(safeAddress, safeTokenId);

    res.json({
        status: 'success',
        url: `${hostName}/data/${jsonFileName}`,
    });
});

console.log('Server started');
app.listen(8899);
