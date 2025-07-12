const express = require('express');
const router = express.Router();
const SwapRequest = require('../Models/SwapRequest');

// Send a swap request
router.post('/send', async (req, res) => {
  const { fromUser, toUser, message } = req.body;
    console.log('Received swap send request:', req.body);
  if (!fromUser || !toUser || !message) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    const swap = await SwapRequest.create({ fromUser, toUser, message });
    res.status(201).json(swap);
  } catch (err) {
    console.error('Error creating swap:', err.message);
    res.status(500).json({ error: 'Failed to send swap request' });
  }
});




// Get all swaps for a user by ID
router.get('/:id', async (req, res) => {
  try {
    const swaps = await SwapRequest.find({
      $or: [{ fromUser: req.params.id }, { toUser: req.params.id }]
    })
    .populate('fromUser', 'name email')
    .populate('toUser', 'name email')
    .sort({ createdAt: -1 });

    res.json(swaps);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get swaps' });
  }
});

// Accept or reject a swap
router.put('/respond/:id', async (req, res) => {
  const { status } = req.body;
  if (!['accepted', 'rejected'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  try {
    const updated = await SwapRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Swap not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update status' });
  }
});

// Delete a swap (only if not accepted)
router.delete('/:id', async (req, res) => {
  try {
    const swap = await SwapRequest.findById(req.params.id);
    if (!swap || swap.status === 'accepted') {
      return res.status(403).json({ error: 'Cannot delete accepted swap' });
    }
    await swap.deleteOne();
    res.json({ message: 'Swap request deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete swap' });
  }
});

// Add feedback and rating to a completed swap
router.put('/feedback/:id', async (req, res) => {
  try {
    const { feedback, rating } = req.body;
    const updated = await SwapRequest.findByIdAndUpdate(
      req.params.id,
      { feedback, rating },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add feedback' });
  }
});

// GET user by email
// Add in your User routes file
// GET /api/users/email/:email
// GET /api/users/email/:email





module.exports = router;
