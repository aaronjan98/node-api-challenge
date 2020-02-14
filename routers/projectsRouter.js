const express = require('express');

const Actions = require('../data/helpers/actionModel.js');
const Projects = require('../data/helpers/projectModel.js');
const router = express.Router();

router.get('/', (req, res) => {
    // req.body = [];
    // console.log(req.body);
    Projects.get(req.body).then(resources => {
      console.log(resources);
      res.status(201).json(resources);
    }).catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Unable to retrieve resources' });
    });
});

router.get('/:id', (req, res) => {
    Projects.get(req.params.id)
    .then(resource => {
      console.log(resource);
      res.status(201).json(resource);
    }).catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Unable to retrieve resource' });
    });
});

router.get('/:id/actions', validateProjectId, (req, res) => {
    
    Projects.getProjectActions(req.params.id)
    .then(action => {
        console.log(action);
        res.status(201).json(action);
      }).catch(err => {
        console.log(err);
        res.status(500).json({ error: 'Unable to retrieve the actions' });
      });
})

router.post('/:id/actions', validateProjectId, (req, res) => {
    Actions.insert(req.body)
    .then(action => {
        console.log(action);
        res.status(201).json(action);
      }).catch(err => {
        console.log(err);
        res.status(500).json({ error: 'Unable to retrieve the created action' });
      });
})

router.post('/', (req, res) => {
    // req.body = [];
    // console.log(req.body);
    Projects.insert(req.body).then(resource => {
        console.log(resource);
        res.status(201).json(resource);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: 'Unable to retrieve resource' });
    });
})

router.put('/:id', validateProjectId, (req, res) => {
    const { id } = req.params;
    const changes = req.body;
  
    Projects.update(id, changes).then(updated => {
      res.status(200).json(updated);
    }).catch(err => {
      console.log(err);
      res.status(500).json({ error: "The user information could not be modified." });
    });
});

// custom middleware

function validateProjectId(req, res, next) {
    const { id } = req.params;

    Projects.get(id)
    .then(project => {
      console.log('project', project);
      if( Object.keys(project).length == 0){
        res.status(400).json({ message: "invalid project id" });
      }else next();
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: `Couldn't retrieve a project with id: ${id}` });
    });
}

module.exports = router;