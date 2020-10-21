const express = require('express');
const app = express();
const PouchDB = require('pouchdb');
const pouchRouter = require('express-pouchdb');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const DB_URL = '/db';
const pouchHandle = pouchRouter(PouchDB);
const fauxtonIntercept = (req, res, next) => {
  let referer = req.header('Referer');
  if (!referer) return next();

  let parsed = url.parse(referer);
  if (0 === parsed.pathname.indexOf(path.join(DB_URL, '/_utils/'))) {
    return pouchHandle(req, res);
  }
  return next();
};

app.use(DB_URL, pouchHandle);
app.use(fauxtonIntercept);

const opn = require('opn');
app.use(express.static('.'));

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
  opn(`http://localhost:${PORT}`);
});
