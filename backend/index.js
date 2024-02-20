const express = require("express");
const routeRouter = require('./routes/index');
const cors  = require('cors')
const PORT = 3000;
const app = express();
app.use(cors());

app.use('/api/v1', routeRouter);

app.use(express.json());

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
})