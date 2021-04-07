require('dotenv').config();
const express = require('express');
const port = process.env.PORT;

const app = express();

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.listen(port, () => {
  console.log(`Server running at ${port}`);
})