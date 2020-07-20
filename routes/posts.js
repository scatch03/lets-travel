let express = require('express');
let uniqid = require('uniqid');
let authMiddleware = require('../middleware/auth');

let Post = require('../models/posts').Post;

let router = express.Router();

router.get('/', async (req, resp) => {
  resp.send(await Post.find());
});

router.get('/:id', async (req, resp) => {
  resp.send(await Post.findOne({id: req.params.id}));
});

router.post('/', authMiddleware, async (req, resp) => {
  await new Post({
    id: uniqid(),
    title: req.body.title,
    date: new Date(),
    description: req.body.description,
    text: req.body.text,
    country: req.body.country,
    imageURL: req.body.imageUrl || req.file.path.substring(req.file.path.indexOf('/'), req.file.path.length)
  }).save();
  resp.send('Created');
});

router.put('/:id', authMiddleware, async (req, resp) => {
  await Post.updateOne({id: req.params.id}, req.body);
  resp.send('Updated!');
});

router.delete('/:id', authMiddleware, async (req, resp) => {
  await Post.deleteOne({id: req.params.id});
  resp.send('Deleted!');
});

module.exports = router;
