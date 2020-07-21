const express = require('express');
const router = express.Router();
const home = require('../controllers/home');
const image = require('../controllers/image');

module.exports = app => {

    router.get('/', home.index);
    router.get('/images/:imageId', image.index);
    router.post('/images', image.create);
    router.post('/images/:imageId/like', image.like);
    router.post('/images/:imageId/comment', image.comment);
    router.delete('/images/:imageId/delete', image.remove);

    app.use(router);
}