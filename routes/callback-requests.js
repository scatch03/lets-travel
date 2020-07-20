let express = require('express');
let uniqid = require('uniqid');

let CallbackRequest = require('../models/callback-requests').CallbackRequest;

let router = express.Router();

router.get('/', async (req, resp) => {
  resp.send(await CallbackRequest.find());
});
router.post('/', async (req, resp) => {
  let callbackRequest = new CallbackRequest({
    id: uniqid(),
    phoneNumber: req.body.phoneNumber,
    date: new Date()
  });
  await callbackRequest.save();
  resp.send('Accepted!');
});
router.delete('/:id', async (req, resp) => {
  await CallbackRequest.deleteOne({id: req.params.id});
  resp.send('Deleted!');
});

module.exports = router;
