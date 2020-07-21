let mongoose = require('mongoose');
let express = require('express');
let multer = require('multer');
let cookieParser = require('cookie-parser');
let auth = require('./controllers/auth');

let Post = require('./models/posts').Post;

let postsRouter = require('./routes/posts');
let callbackRequestsRouter = require('./routes/callback-requests');
let emailsRouter = require('./routes/emails');
let usersRouter = require('./routes/users');

let app = express();

// serve static content
app.use(express.static('public'));
// parse json
app.use(express.json());
// parse cookie for every request
app.use(cookieParser());
// process file uploads
let imageStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/images'),
  filename:    (req, file, cb) => cb(null, file.originalname)
});
app.use(multer({storage: imageStorage}).single('imageFile'));

// set ejs as a view engine
app.set('view engine', 'ejs')

// specify routers
app.use('/posts', postsRouter);
app.use('/callback-requests', callbackRequestsRouter);
app.use('/emails', emailsRouter);
app.use('/users', usersRouter);

// render veiw with an ejs template (should be in a views directory)
app.get('/sight', async (req, resp) => {
  let id = req.query.id;
  let post = await Post.findOne({id: id});
  resp.render('sight', {
    title: post.title,
    imageURL: post.imageURL,
    date: post.date,
    text: post.text
  });
});

app.get('/admin', (req, res) => {
  let token = req.cookies['auth_token'];
  if (token && auth.checkToken(token)) {
    res.render('admin');
  } else {
    res.redirect('/login');
  }
});

app.get('/login', (req, res) => {
  res.render('login');
})

mongoose.connect('mongodb+srv://letstravel:letstravel@cloudappsmongo.wmqp9.mongodb.net/travels?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

app.listen(3000, () => {
  console.log("Application listening on port 3000...");
});
