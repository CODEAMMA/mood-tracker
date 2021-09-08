var express = require('express');
var router = express.Router();
const db = require("../model/helper");

// GET all events
router.get("/", function(req,res){
    db(`SELECT * FROM events;`)
    .then((results) => {
        res.send(results.data);
    })
    .catch(err => res.status(404).send(err));
})

const getAllEvents = (req,res) => {
    db(`SELECT * FROM events;`)
    .then((results) => {
        res.send(results.data);
    })
    .catch(err => res.status(404).send(err));
}

// GET one event
router.get('/:id', function(req,res){
    db(`SELECT * FROM events WHERE id=${req.params.id};`)
    .then(results => {
        res.send(results.data);
    })
    .catch(err => res.status(404).send(err));
})

router.get('/mood', function(req,res){
    db(`SELECT * FROM events WHERE mood=${req.params.mood};`)
    .then(results => {
        res.send(results.data);
    })
    .catch(err => res.status(404).send(err));
})

// INSERT a new title
router.post("/", function(req,res){
    db(`INSERT INTO events (date,title,mood) VALUES ("${req.body.date}","${req.body.title}", "${req.body.mood}");`)
    .then(() => {
        getAllEvents(req,res);
    })
    .catch(err => res.status(404).send(err));
})

// UPDATE everything in event
router.put("/:id", function(req,res){
    db(`UPDATE events SET date="${req.body.date}", title="${req.body.title}", mood="${req.body.mood}";`)
    .then(()=> {
        getAllEvents(req,res);
    })
    .catch(err => res.status(404).send("fail to update"));
})

// UPDATE date in event 
router.put("/:id/date", function(req,res){
    db(`UPDATE events SET date="${req.body.date}" WHERE id=${req.params.id};`)
    .then(()=> {
        getAllEvents(req,res);
    })
    .catch(err => res.status(404).send("event not found"));
})

// UPDATE title
router.put("/:id/title", function(req,res){
    db(`UPDATE events SET title="${req.body.title}" WHERE id=${req.params.id};`)
    .then((results)=> {
        getAllEvents(req,res);
    })
    .catch(err => res.status(404).send("event not found"));
})

// UPDATE mood
router.put("/:id/mood", function(req,res){
    db(`UPDATE events SET mood="${req.body.mood}" WHERE id=${req.params.id};`)
    .then((results)=> {
        getAllEvents(req,res);
    })
    .catch(err => res.status(404).send("event not found"));
})

// DELETE an event
router.delete("/:id", function(req,res){
    db(`DELETE FROM events WHERE id=${req.params.id};`)
    .then(() => {
        getAllEvents(req,res);
    })
    .catch(err => res.status(404).send(err))
})
module.exports = router;