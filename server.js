const express = require('express');
const path = require('path');
const app = express();

const { gamesController } = require('./src/app/controllers/games.controller')


app.use(express.static(__dirname + '/dist/mySteam'));
app.use(express.json());

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/mySteam/index.html'));
})
app.listen(process.env.PORT || 8080);