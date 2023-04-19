// routes/cabs.js
const express = require('express');
const Cab = require('../models/Cab');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const cabs = await Cab.find();
    res.json(cabs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get cabs' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const cab = await Cab.findById(req.params.id);
    if (!cab) {
      return res.status(404).json({ error: 'Cab not found' });
    }
    res.json(cab);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get cab' });
  }
});

router.post('/', async (req, res) => {
  try {
    const cab = await Cab.create(req.body);
    res.json(cab);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Failed to create cab' });
    }
  }
});

router.put('/:id', async (req, res) => {
  try {
    const cab = await Cab.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!cab) {
      return res.status(404).json({ error: 'Cab not found' });
    }
    res.json(cab);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Failed to update cab' });
    }
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const cab = await Cab.findByIdAndDelete(req.params.id);
    if (!cab) {
      return res.status(404).json({ error: 'Cab not found' });
    }
    await Booking.deleteMany({ cab: cab._id });
    res.json({ message: 'Cab deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete cab' });
  }
});

module.exports = router;
