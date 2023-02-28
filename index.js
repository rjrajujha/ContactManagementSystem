const app = require('./app');

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

require('dotenv').config();
const mondodbURL = process.env.mondodbURL;
const port = process.env.PORT;

mongoose.connect(`${mondodbURL}/ContactManagementSystem`)
    .then(() => console.log('Connected to dataBase'))
    .catch((err) => console.log("Error connecting dataBase", err))
    .finally(() => console.log("dataBase Connection finished"));


app.listen(port, () => {
    console.log(`Server is up at port ${port}`);
})