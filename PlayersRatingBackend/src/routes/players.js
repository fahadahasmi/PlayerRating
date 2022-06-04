require('dotenv').config();
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const con = require('../config/db_config');

router.get('/getAllPlayers', (req, res) => {
    try{
        var sql = "SELECT PlayerId,Name,TeamName,Exp,Rating FROM playerdetails";
        con.query(sql, function(err, result) {
            if (err) throw err;
            res.json(result);
        });
    }catch(e){
        res.status(400).json({message:"some reason error message"});
    }
});

router.get('/getPlayerDetail/:id', (req, res) => {
    try{
        let id = req.params.id;
        var sql = "SELECT * FROM playerdetails Where playerId = " + mysql.escape(id) + " ;";
        con.query(sql, function(err, result) {
            if (err) throw err;
            res.json(result);
        });
    }catch(e){
        res.status(400).json({message:"some reason error message"});
    }
});

router.post('/addRatPlayers/:id', (req, res) => {
    try{
        let id = req.params.id;
        const { rating } = req.body;
        var sql = "SELECT Rating,noOfRating,SumOfRating FROM playerdetails Where playerId = " + mysql.escape(id) + " ;";
        con.query(sql, function(err, result) {
            if (err) throw err;
            let rat = JSON.parse(JSON.stringify(result))[0].Rating;
            let sum = parseInt(JSON.parse(JSON.stringify(result))[0].SumOfRating);
            let totalRating = parseInt(JSON.parse(JSON.stringify(result))[0].noOfRating) + 1;
            let newRating = (sum + parseInt(rating)) / totalRating;
            console.log(sum,totalRating);
            let sql1 = "Update playerdetails set Rating = " + mysql.escape(newRating) + ", noOfRating = noOfRating + 1,SumOfRating = SumOfRating + "+ newRating + "  Where playerId = " + mysql.escape(id) + " ;";
            con.query(sql1, function(e, resp) {
            if (e) throw e;
                res.json(resp);
            });
        });
    }catch(e){
        res.status(400).json({message:"some reason error message"});
    }
});

module.exports = router;