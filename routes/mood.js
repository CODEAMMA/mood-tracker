var express = require('express');
var router = express.Router();
const db = require("../model/helper");

router.get('/mood', function(req,res){
    db(`SELECT mood FROM events`)
    .then(results => {
        res.send(results.data);
    })
    .catch(err => res.status(404).send(err));
})

module.exports = router;