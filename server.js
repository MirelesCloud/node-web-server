const express = require('express');
const hbs = require('hbs');
let fs = require('fs');

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

/*app.use((req, res, next) => {
  res.render('maintenance');
});*/

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase()
});

app.get('/', (req, res) => {
  //res.send('<h1>Hola Vato Loco</h1>');
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMsg: 'Welcome to the Pleasuredome',

  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',

  });
});

app.get('/bad', (req, res) => {
  res.send({
    error: 'bad request'
  })
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
