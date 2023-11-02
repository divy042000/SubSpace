const express = require('express');
    const axios = require('axios');
    const router = express.Router();

const BlogController = require('../controllers/extractDetails');

router.get("/blog-stats",BlogController.extractDetails)
router.get('/blog-search',BlogController.searchDetails)

module.exports=router;