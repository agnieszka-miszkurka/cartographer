
const express = require('express');
const bodyParser = require('body-parser');
const webhookController = require('./controllers/webhookController');
const health = require('./controllers/health');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.post('/webhook', webhookController);

app.get('/health', health);

app.listen(port, () => console.log('Server running on port 3000'));
