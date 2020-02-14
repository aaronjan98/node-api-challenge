const express = require('express');

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