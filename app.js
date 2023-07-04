const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);

app.use(express.static(path.join(__dirname, 'public')));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get("/beers", (request, response) => {
  punkAPI
    .getBeers()
    .then(beers => {
      console.log ("Beers from the database:", beers);
      response.render("beers", {data: beers});
    })

    .catch(error => console.log(error));
});

app.get("/random-beer", (request, response) => {
  punkAPI
    .getRandom()
    .then(random => {
      response.render("random-beer", {data: random[0]});
      console.log ("Random beers from punkAPI", random);
    })
    .catch(error => console.log(error));

  
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
