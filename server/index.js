const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const path = require('path');

const database = require('../database/index.js');
const User = require('../database/schemas/UserSchema.js');
const util = require('./util.js');

// Module constants
const SALT_ROUNDS = 10; // Difficulty  to crack (Incrementing doubles compute time)
const CLIENT_FOLDER = path.join(__dirname, '..//client/dist');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || '0979zx7v6vvq0398ubvq7w6dc8c7z5rvg7i1',
  cookie: {},
  resave: true,
  saveUninitialized: true,
}));

// Handle static endpoints
const allPublicEndpoints = ['/login', '/register'];
const allPrivateEndpoints = ['/', '/lists'];

function serveStatic(endpoint, authorizeCallback = (req, res, next) => next()) {
  app.get(endpoint, authorizeCallback, (req, res) => res.sendFile(path.join(CLIENT_FOLDER, 'index.html')));
}

allPublicEndpoints.forEach(endpoint => serveStatic(endpoint));
allPrivateEndpoints.forEach(endpoint => serveStatic(endpoint, util.checkLoggedIn));

// Make all files in dist public (Must be after setting static endpoints)
app.use(express.static(CLIENT_FOLDER));

// All public API calls
app.post('/login', (req, res) => {
  const { username, password } = req.body; // might only be req.body

  // If user
  if (username && password) {
    const db = User.find({ username }).exec();

    db.then(async (user) => {
      const isValiduser = await bcrypt.compare(password, user[0].hash);
      return {
        user: user[0],
        hash: user[0].hash,
        isValidUser: isValiduser,
      };
    })
      .then(({ user, hash, isValidUser }) => {
        if (!isValidUser) {
          res.end('/login');
        }
        req.session.username = username;
        req.session.hash = hash;
        database.searchForListsAndPopulate(user.grocery_lists, (lists) => {
          database.searchForCategory({}, (categories) => {
          let results = {'loc': '\/', 'lists': lists, 'userData': user, 'categories': categories};
            res.end(JSON.stringify(results));
          })

        })

      })
      .catch((err) => {
        if (err) console.error('user does not exist.');
      });
  } else {
    res.redirect('/login');
  }
});

app.post('/updateHistory', (req, res) => {
  console.log('A;ALSKJSDFJ;LKSDJAF;LKJADSF;LKJA', req.body)
  database.searchForItemInHistoryAndPopulate(req.body, true, (historyItem) => {
    console.log('check me out ', historyItem)
    res.end(JSON.stringify(historyItem));
  })
});

app.get('/logout', (req, res) => {
  // Remove user
  console.log('Logout', req.session);
  req.session.destroy();
  res.redirect('/login');

});

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  /*
  What happens when a username already exists?
  */
  // If user
  if (username && password) {
    bcrypt.hash(password, SALT_ROUNDS)
      .then(async hash => (
        database.saveUser({
          username,
          hash,
          grocery_list: [],
          last_login: new Date(),
          failed_login_attempts: 0,
        })
      ))
      .then((hash) => {
        req.session.username = username;
        req.session.hash = hash;

        res.end('/login');
      })
      .catch();
  } else {
    res.end('/register');
  }
});

// All private API calls
// add new categories into DB if not found in DB
app.post('/category/create', util.checkLoggedIn, (req, res) => {
  database.searchForCategory(req.body, (category) => {
    res.end(JSON.stringify(category));
  });
});

// searches the database for an item, if it doesn't exists a new item
// will be created
app.post('/search/item', util.checkLoggedIn, (req, res) => {
  database.searchForItem(req.body, (item) => {
    res.end(JSON.stringify(item));
  });
});

app.post('/addItem', (req, res) => {
  console.log('add item endpoint', req.body)
  database.searchForItemInHistory(req.body, (updatedList) =>{
    console.log('after itemHistory', updatedList);
    database.searchForListsAndPopulate([updatedList._id], (populatedList) => {
      console.log('after population', populatedList);
      res.end(JSON.stringify(populatedList))

    });
  });
});


app.post('/lists/create', util.checkLoggedIn, (req, res) => {
  console.log('BEFORE', req.body);
  database.createList(req.body, (list) => {
    res.end(JSON.stringify(list));
  });
});

app.get('/store/search', util.checkLoggedIn, (req, res) => {
  const { name } = req.query;

  const promiseSearch = name ? database.storeSearch({ name }).exec() : database.storeSearch({}).exec();

  promiseSearch.then(stores => res.send(stores));
});

app.post('/store/create', util.checkLoggedIn, (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(404);
    res.send('Requires name');
    return;
  }

  database.storeSave({ name })
    .then(store => res.send(store))
    .catch((err) => {
      res.status(500);
      console.error(`Could not create store ${name} in Stores database (Duplicate?)`, err);
      res.send('Apologies for this error. From our expreience this occurs when the store name is a duplicate. We advise checking the store name.');
    })
});

// Initialization
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
