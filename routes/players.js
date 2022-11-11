const express = require('express')
const router = express.Router();

// let players = require('./../dummyDatabase')

router.get("/", (req, res) => {
    res.status(200).send("HI! Welcome to the main player page. You can find all the players information from this route.")
})

router.get("/list", async (req, res) => {
    try{
        const database = await client.db('sample_mflix');
        const movies = await database.collection('movies');

        const resp = await movies.estimatedDocumentCount();
        console.log(resp);

        res.status(200).json({
            data: players
        });
    }catch(err){
        res.status(400).json({message: err.message});
    }
});

router.get("/list/:id", async (req, res) => {
    try {
        // let id = Number(req.params.id);
        // const player = players.find(player => player._id === id);

        res.status(200).json({
            data: player,
        })
    }catch(err){
        res.status(400).json({message: err.message});
    }
});

module.exports = router;