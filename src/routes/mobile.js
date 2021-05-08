const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
    return response.status(201).send({ success: true })
})

module.exports = router;