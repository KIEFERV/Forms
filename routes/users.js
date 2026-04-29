const express = require('express');
const router = express.Router();

const users = [
  { firstName: "Bob", lastName: "Bobson", gender: "male", age: 67 },
  { firstName: "Rita", lastName: "Rima", gender: "female", age: 29 }
];

router.get('/', (req, res) => {
  res.redirect('/users/list');
});

router.post('/', (req, res) => {
  const { firstName, lastName, gender, age } = req.body;
  if (firstName) {
    users.push({ firstName, lastName, gender, age });
    res.redirect('/users/list');
  } else {
    res.render('users/new', { firstName, lastName, gender, age });
  }
});

router.get('/list', (req, res) => {
  res.render('users/list', { users });
});

router.get('/new', (req, res) => {
  res.render('users/new', { firstName: '', lastName: '', gender: '', age: '' });
});

router.param('id', (req, res, next, id) => {
   req.user = users[parseInt(id)];
  next();
});

router.get('/:id', (req, res) => {
  res.render('users/show', { user: req.user, id: req.params.id });
});

module.exports = router;