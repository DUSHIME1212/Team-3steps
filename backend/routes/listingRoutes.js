const express = require('express');
const router = express.Router();
const Listing = require('./Listing'); // Import the Listing model

// GET route to fetch listings from MongoDB
router.get('/', async (req, res) => {
  try {
    const listings = await Listing.find(); // Fetch listings from MongoDB
    res.json(listings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching listings' });
  }
});

// POST route to add a new listing to MongoDB
router.post('/', async (req, res) => {
  const { title, location, price } = req.body;
  const newListing = new Listing({
    title,
    location,
    price
  });

  try {
    const savedListing = await newListing.save(); // Save to MongoDB
    res.json(savedListing);
  } catch (err) {
    res.status(500).json({ message: 'Error saving listing' });
  }
});

module.exports = router;
