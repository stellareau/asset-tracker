const express = require('express');
const jwt = require('jsonwebtoken');
const saml = require('saml-encoder-decoder-js');
const libxmljs = require("libxmljs");
const config = require('./config');

const router = express.Router();

router.post('/sso', (req, res) => {
  const encodedSAML = req.body.SAMLResponse;

  saml.decodeSamlPost(encodedSAML, (err, xml) => {
    if (err) throw err;

    let re = new RegExp('<NameID.*>(.*\..*@.*\.com)</NameID>');
    let email = xml.toString().match(re)[1];
    let username = email.split('@')[0];
    let JWTToken = jwt.sign({ email: email, username: username }, config.secret, { expiresIn: '7d' });

    console.log(email, username, JWTToken);
    console.log(config.url);
  
    res.cookie('auth', JWTToken, {maxAge: 9999999, httpOnly: false});
    res.setHeader('Location', config.url);
    return res.status(303).json({token: JWTToken});
  });
});

module.exports = router;