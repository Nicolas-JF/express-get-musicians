const express = require('express');
const { body, validationResult } = require('express-validator');

const app = express();
app.use(express.json());

const musicians = [];

app.post('/musicians', [
  body('name').trim().notEmpty().withMessage('Name is required and cannot be empty or whitespace'),
  body('instrument').trim().notEmpty().withMessage('Instrument is required and cannot be empty or whitespace')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const newMusician = {
    id: musicians.length + 1, 
    name: req.body.name,
    instrument: req.body.instrument
  };
  musicians.push(newMusician);

  res.status(201).json(musicians);
});

module.exports = app;
