// const express = require('express')
import express from 'express'
// const path = require('path')
import path from 'path';
const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', (req, res) => {
  // call middleware
  console.log('from server/index.js:',req.body);
  res.status(200).json(req.body)
})



app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));