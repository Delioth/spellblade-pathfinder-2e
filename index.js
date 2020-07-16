const express = require('express');
const app = express();
const port = 3000;

const opn = require('opn');

app.use(express.static('.'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  opn('http://localhost:3000');
});
