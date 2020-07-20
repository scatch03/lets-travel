let express = require('express');
let bcrypt = require('bcrypt');
let auth = require('../controllers/auth');

let User = require('../models/users').User;

let router = express.Router();

router.post('/login', async (req, resp) => {
  let email = req.body.email;  // body - because post
  let password = req.body.password;

  let users = await User.find().where({email: email});
  if (users.length > 0) {
    let passwordMatch = await bcrypt.compare(password, users[0].password);
    if(passwordMatch) {
      resp.cookie('auth_token', auth.generateToken(users[0]));
      resp.send({redirectURL: '/admin'});
    } else {
      resp.status(400);
      resp.send('Rejected');
    }
  } else {
    resp.send('Rejected');
  }
});

router.post('/register', async (req, resp) => {
  let email = req.body.email;  // body - because post
  let password = req.body.password;

  let users = await User.find().where({email: email});
  if (users.length === 0) {
    let encryptedPass = await bcrypt.hash(password, 6);
    await new User({email: email, password: encryptedPass}).save();
    resp.send('Registered');
  } else {
    resp.send('Rejected');
  }
});

module.exports = router;
