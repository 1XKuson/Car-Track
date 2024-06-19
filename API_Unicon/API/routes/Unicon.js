// routes/Unicon.js
import express from 'express';
import Unicon from '../models/Position.js';

const router = express.Router();

// Get all Unicons
router.get('/', async (req, res) => {
  try {
    const unicons = await Unicon.find();
    res.json(unicons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:UniconID', async (req, res) => {
  try {
    const unicon = await Unicon.findOne({ UniconID: req.params.UniconID }).sort({createdAt: -1});
    if (!unicon) return res.status(404).json({ message: 'Unicon not found' });
    res.status(200).json(unicon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new Unicon
router.post('/', async (req, res) => {
  const { UniconID, lat, lng } = req.body;
  
  const unicon = new Unicon({
    UniconID,
    position: { lat, lng },
  });
  
  try {
    const newUnicon = await unicon.save();
    res.status(201).json(newUnicon);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a Unicon by ID
router.delete('/:id', async (req, res) => {
  try {
    const unicon = await Unicon.findById(req.params.id);
    if (!unicon) return res.status(404).json({ message: 'Unicon not found' });

    await unicon.remove();
    res.json({ message: 'Unicon deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
