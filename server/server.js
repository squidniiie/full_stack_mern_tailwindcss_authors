const express = require('express');
const cors = require('cors');
const app = express();
require('./config/mongoose.config'); // This is new
app.use(cors());
app.use(express.json()); // This is new
app.use(express.urlencoded({ extended: true })); // This is new
require('./routes/author.routes')(app);
app.listen(4000, () => {
    console.log("Listening at Port 4000")
})