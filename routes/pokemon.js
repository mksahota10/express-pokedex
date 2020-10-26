const express = require('express');
const router = express.Router();
const db = require('../models');
const { default: Axios } = require('axios');
const axios = require('axios'); 

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  db.pokemon.findAll()
  .then(pokemon=>{
res.render('index', {pokemon: pokemon, showButton: false})
  })
  // TODO: Get all records from the DB and render to view
  //res.send('Render a page of favorites here');
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', (req, res)=>{
  db.pokemon.findOrCreate({
    where: {name: req.body.name},
  })
  .then(([createdFave, wasCreated ]) =>{
    res.redirect('/pokemon')
  })
  //res.send(req.body)
})



//Part: 4
router.get('/:idx', (req, res)=>{
  let pokemonIndex= req.params.idx
  axios.get(`http://pokeapi.co/api/v2/pokemon/${pokemonIndex}`)
 .then(response=>{
   //res.send(response.data)
   res.render('show', {pokemonIndex: response.data })  //so the variable moviesId came from my show route, because i called it moviesID. The second variable came from my Url parameter. we then changes it to response.data to get all the info
 }) 
 .catch(err =>{
  console.log(err)
})
})


module.exports = router;


// app.post('/faves', (req, res)=>{
//   console.log("Form data:", req.body)
//   db.fave.create(req.body)
//   .then(createdFave =>{  
//       res.redirect('/faves')
//       //res.send(createdFave)
//   })
// })