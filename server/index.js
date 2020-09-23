const express = require('express');
const bodyparser = require('body-parser');//extracts body portion of an entire request
const morgan = require('morgan');
const cors = require('cors');//cross origin requests
const path = require('path');
const router = require('./router');
const app = express();
const port = 3000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(morgan('dev')); //generates logs when requests are made
app.use(cors());

app.use('/api', router);
app.get('/name',(req, res) => res.send('Andrew'));
app.use('/', express.static(path.join(__dirname, '../client/dist')));
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

