const express = require('express');

const Actions = require('../data/helpers/actionModel.js');
const router = express.Router();

router.get('/', (req, res) => {
    // req.body = [];
    // console.log(req.body);
    Actions.get(req.body).then(actions => {
      console.log(actions);
      res.status(201).json(actions);
    }).catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Unable to retrieve actions' });
    });
});

router.get('/:id', (req, res) => {
    console.log(req);
    Actions.get(req.params.id).then(action => {
      console.log(action);
      res.status(201).json(action);
    }).catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Unable to retrieve action' });
    });
});


router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
  
    Actions.update(id, changes).then(updated => {
      res.status(200).json(updated);
    }).catch(err => {
      console.log(err);
      res.status(500).json({ error: "The user information could not be modified." });
    });
});

module.exports = router;