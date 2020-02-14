const express = require('express');

const Actions = require('../data/helpers/actionModel.js');
const router = express.Router();

router.get('/', (req, res) => {
    Actions.get().then(actions => {
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

router.delete('/:id', (req, res) => {
    Actions.remove(req.params.id).then(deleted => {
      console.log('DELETED:', deleted);
      res.sendStatus(200);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "The user could not be removed" });
    });
});

// custom middleware

function validateActionId(req, res, next) {
    const { id } = req.params;

    Actions.get(id)
    .then(action => {
      console.log('action', action);
      if( Object.keys(action).length == 0){
        res.status(400).json({ message: "invalid action id" });
      }else next();
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: `Couldn't retrieve a action with id: ${id}` });
    });
}

module.exports = router;