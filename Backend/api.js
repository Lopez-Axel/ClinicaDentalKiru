const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const util = require('util');
const cors = require('cors');
require('dotenv').config();
require('./auth_google.js');

const jwtSign = util.promisify(jwt.sign);

const app = express();

app.use(cors({
  origin: 'http://localhost:9000',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use('/users', require('./routes/users.js'));
app.use('/anuncios', require('./routes/anuncioRoutes'));


app.get('/', (req, res) => {
  res.send('<a href="/auth/google">Authenticate con google</a>');
});

app.get('/auth/google',
  passport.authenticate('google', { 
    scope: ['email', 'profile'],
    session: false 
  })
);

app.get('/google/callback',
  passport.authenticate('google', { 
    failureRedirect: 'http://localhost:9000/login?error=auth_failed',
    session: false 
  }),
  async (req, res) => {
    try {
      const token = await jwtSign(JSON.stringify(req.user), process.env.SECRET);
      const userEncoded = encodeURIComponent(JSON.stringify(req.user));
      
      res.redirect(`http://localhost:9000/#/auth/callback?token=${token}&user=${userEncoded}`);
    } catch (err) {
      console.error('Error generando token:', err);
      res.redirect('http://localhost:9000/login?error=token_generation_failed');
    }
  }
);

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`✓ Servidor ejecutándose en puerto ${PORT}`);
});