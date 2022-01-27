const express = require('express');

const app = express();
const mongoose = require('mongoose');

const Sauce = require('./models/Sauce');

mongoose.connect('mongodb+srv://Antonio:maki@web-developer-p6.rorny.mongodb.net/web-developer-p6?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());

app.use((_req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

//------------------ login et signup------------------//

app.post('/api/auth/signup', (_req, _res, _next) =>{

});

app.post('/api/auth/login', (_req, _res, _next) =>{

});

//----------------- SAUCES API-----------------------//

app.post('/api/sauces', (_req, _res, _next) => {
    delete _req.body._id;
    const Sauce = new Sauce({
        ..._req.body
    });
   Sauce.save()
   .then(() => _res.status(201).json({ message: 'Objet enregistré !'}))
   .catch(error => _res.status(400).json({ error })); 
});


app.get('/api/sauces', (_req, res, _next) => {
    Sauce.find()
      .then(sauces => res.status(200).json(sauces))
      .catch(error => res.status(400).json({ error }));
  });


app.get('/api/sauces/:id', (_req, res, _next) => {
    Sauce.findOne({ _id: _req.params.id})
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
});


app.put('/api/sauces/:id', (req, res, _next) => {
    Sauce.updateOne({_id: req.params.id}, { ...req.body, _id: req.params.id}) 
    .then(() => res.status(200).json({ message: ' Objet modifié'}))
    .catch(error => res.status (400).json({ error }));  
  });

app.delete('/api/sauces/:id', (req, res, _next) => {
    Sauce.deleteOne({_id: req.params.id},) 
.then(() => res.status(200).json({ message: 'Objet supprimé'}))
.catch(error => res.status (400).json({ error }));  
});

//--------------- LIKE SAUCE----------------//
app.post('/api/sauces/:id/like', (_req, _res, _next) => {

});

module.exports = app;