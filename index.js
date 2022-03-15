const axios = require('axios');
const express = require('express')
const app = express()
const port = 3000
const {solve} = require('./solveWordle.js');

let palabras;

app.get('/solve', wordleSolve)

app.listen(port, () => {
    console.log(`Wordle solver API running in http://localhost:${port}/solve`)
})

// Make a request for a user with a given ID
function wordleSolve(req, res) {
    axios.get('https://yurigo.dev/wordlesolver/wordlES.json')
        .then(function (response) {
            // handle success
            if (response.status === 200){
                palabras = response.data;
                let letters = req.query.letters
                let l1 = req.query.l1
                let l2 = req.query.l2
                let l3 = req.query.l3
                let l4 = req.query.l4
                let l5 = req.query.l5

                if (letters === undefined) {
                    letters = " "
                }

                if (l1 === undefined) l1 = null
                if (l2 === undefined) l2 = null
                if (l3 === undefined) l3 = null
                if (l4 === undefined) l4 = null
                if (l5 === undefined) l5 = null

                console.log("Letters received "+ letters)
                console.log("Letters solved... ["+l1+"]["+l2+"]["+l3+"]["+l4+"]["+l5+"]")

                res.json((solve(palabras, letters , [l1, l2, l3, l4, l5])));
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
}
