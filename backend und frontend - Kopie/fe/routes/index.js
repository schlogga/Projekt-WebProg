var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const testData = [
    {
      label: "Vornahme",
      type: "text",
      value: "Peter",
      placeholder: "ENTER A FUCKING NAME"
    },
    {
      label: "Nachname",
      type: "text",
      value: "Hoffman",
      placeholder: "ENTER A FUCKING NACHNAME"
    }
  ]

  res.render('index', { title: 'Express', data: testData});
});

module.exports = router;
