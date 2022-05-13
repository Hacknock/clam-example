const express = require("express");
const app = express();
const fs = require("fs");
const port = 3000;

app.use(express.static("."));
app.listen(port, () => {
  console.info(`Listen at ${port}`);
});
