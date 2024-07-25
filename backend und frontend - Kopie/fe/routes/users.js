var express = require('express');
var router = express.Router();

/*var userController = require('../controllers/usersController'); 
später für das errorhandling? */

/* read all users */
router.get('/', function(req, res, next) {
  fetch('http://localhost:3000/users')
  .then(res => res.json())
  .then(data => {
      //res.render('allUsers', { title: 'Read all users', users: data }); //wird evtl später gebraucht?
      res.status(200).send(data);
      }); 
});


/* Show new user form */
router.get('/create', function(req, res, next) {
  const data = [
    { label: 'Username', type: 'text', value: '', placeholder: 'Enter username' },
    { label: 'Password', type: 'password', value: '', placeholder: 'Enter password' },
    { label: 'Email', type: 'text', value: '', placeholder: 'Enter email address' },
    { label: 'Role', type: 'text', value: '', placeholder: 'Enter role' }
    // Role select möglich?
    // ID und Erstellungsdatum durch backend gesetzt?
  ];
  res.render('genericForm', { title: 'Create New User', data: data });
});

/* Handle form submission and forward to backend */
router.post('/submit-form', function(req, res, next) {
  const newUser = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    role: req.body.role
  };
  // Forward the form data to the backend server
  fetch('http://localhost:3000/', { // replace with your backend API URL
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser),
  })
  .then(response => response.json())
});

// Show search user formular
router.get('/byName', function(req, res, next) {
  const data = [
    { label: 'find Username', type: 'text', value: '', placeholder: 'Enter username' },
  ];
  res.render('genericForm', { title: 'Search User', data: data });
  })

// Search user by name
router.post('/byName', function(req, res, next) {
  const username = req.body.username; // Extract username from the form data

  fetch(`http://localhost:3000/users/byName?username=${username}`, {
    method: 'GET'
  })
  .then(response => response.json())
  .then(userData => {
  //  res.render('userResults', { title: 'User Results', userData: userData }); //Template
  })
  })


/*read user by id*/
router.get('/:id', (req, res) => {
  fetch(`http://localhost:3000/users/${req.params.id}`, {
      method: 'GET'
  }).then(response => response.json())
  .then(data => {
   // res.render('userDetail', { title: 'User Detail', user: data }); //userDetail Template
  });
}); 


// Update single user
router.put('/update/:id', function(req, res, next) {
  const updateUser = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    role: req.body.role
  };

  fetch(`http://localhost:3000/users/${req.params.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateUser),
  })
  .then(response => response.json())
  .then(data => {
    res.redirect(`/users/${req.params.id}`);
  })
});


/* delete single User */
router.get('/delete/:id', (req, res, next) => {
  const userId = req.params.id;
  fetch(`http://localhost:3000/users/${userId}`, {
      method: 'DELETE'
  })
  .then(response => response.json())
  .then(data => {
    res.redirect('/users');
  })    
}); 

// Search user by id
router.post('/id', function(req, res, next) {
  const id = req.body.id; // Extract id from the form data
  fetch(`http://localhost:3000/users/:id=${id}`, {
    method: 'GET'
  })
  .then(response => response.json())
  .then(userData => {
   // res.render('userResults', { title: 'User Results', userData: userData }); //userDetail Template?
  }) 
  })


module.exports = router;