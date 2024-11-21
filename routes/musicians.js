const express = require('express');
const router = express.Router();
const Musician = require('../models/Musician');

router.post('/', async (req, res) => {
  try {
    const musician = new Musician(req.body);
    await musician.save();
    res.status(201).json(musician);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const musicians = await Musician.find();
    res.status(200).json(musicians);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const musician = await Musician.findById(req.params.id);
    if (!musician) {
      return res.status(404).json({ message: 'Musician not found' });
    }
    res.status(200).json(musician);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const musician = await Musician.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!musician) {
      return res.status(404).json({ message: 'Musician not found' });
    }
    res.status(200).json(musician);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const musician = await Musician.findByIdAndDelete(req.params.id);
    if (!musician) {
      return res.status(404).json({ message: 'Musician not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
