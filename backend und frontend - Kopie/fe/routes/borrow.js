var express = require('express');
var router = express.Router();

/*var borrowController = require('../controllers/borrowController'); 
später für das errorhandling? */

/* read all borrows */
router.get('/', function(req, res, next) {
  fetch('http://localhost:3000/borrows')
  .then(res => res.json())
  .then(data => {
      //res.render('allBorrows', { title: 'Read all Borrows', borrow: data }); //wird evtl später gebraucht?
      res.status(200).send(data);
      }); 
});


/* Show new borrow form */
router.get('/create', function(req, res, next) {
  const data = [
    { label: 'Benutzer-ID', type: 'number', value: '', placeholder: 'Benutzer-ID eingeben' },  //oder wird das als angemeldeter automatisch gesetzt?
    { label: 'Artikelnummer', type: 'number', value: '', placeholder: 'Artikelnummer eingeben' },
    { label: 'Startdatum', type: 'date', value: '', placeholder: 'Ausleih Startdatum eingeben' },
    { label: 'Enddatum', type: 'date', value: '', placeholder: 'Ausleih Enddatum eingeben' },
  // borrow-ID im Backend automatisch gesetzt?
  ];
  res.render('genericForm', { title: 'Create New Borrow', data: data });
});

/* Create a new Borrow*/
router.post('/create', function(req, res, next) {
  const newBorrow = {
    userid: req.body.userid,
    equipmentids: req.body.equipmentids,
    start: req.body.start,
    end: req.body.end
  };
  fetch('http://localhost:3000/borrows', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newBorrow),
  })
  .then(response => response.json())
  .then(data => {
    res.redirect('/borrow');
    res.status(200).send(data);
  })
});

module.exports = router;