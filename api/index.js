require('dotenv').config();

const express = require('express');
const app = express();

const port = process.env.PORT || 80;

app.get('/', (req, res) => {
  res.send(process.env.VARIABLE_ONE);
});

app.listen(port, () => {
  console.log(`Server runnning at http://localhost:${port}`);
});
