var express = require('express');
var router = express.Router();

/*var equipmentController = require('../controllers/equipmentController'); 
später für das errorhandling? */

/* read all equipments */
router.get('/', function(req, res, next) {
  fetch('http://localhost:3000/equipment')
  .then(res => res.json())
  .then(data => {
      //res.render('allEquipment', { title: 'Read all equipment', equipment: data }); //wird evtl später gebraucht?
      res.status(200).send(data);
      }); 
});


/* Show new equipment form */
router.get('/create', function(req, res, next) {
  const data = [
    { label: 'Artikelnummer', type: 'number', value: '', placeholder: 'Artikelnummer eingeben' },
    { label: 'Titel', type: 'text', value: '', placeholder: 'Artikelname eingeben' },
    //Bild des Artikels?
    { label: 'Beschreibung', type: 'text', value: '', placeholder: 'Artikelbeschreibung eingeben' },
    { label: 'Anzahl', type: 'number', value: '', placeholder: 'Anzahl der Artikel' },
    { label: 'Benutzer-ID', type: 'number', value: '', placeholder: 'Benutzer-ID eingeben' },  //oder wird das als angemeldeter automatisch gesetzt?
  // equipment-ID im Backend automatisch gesetzt?
  ];
  res.render('genericForm', { title: 'Create New Article', data: data });
});

/* Create a new equipment*/
router.post('/create', function(req, res, next) {
  const newEquipment = {
    articlenumber: req.body.articlenumber,
    title: req.body.title,
    //pic: wie macht man das, wenn ein bild hinzugefügt werden soll?
    description: req.body.description,
    count: req.body.count,
    userid: req.body.userid
  };
  fetch('http://localhost:3000/equipment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newEquipment),
  })
  .then(response => response.json())
  .then(data => {
    res.redirect('/equipment');
    res.status(200).send(data);
  })
});

module.exports = router;