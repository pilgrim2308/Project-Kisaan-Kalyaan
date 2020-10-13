const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const config = require('config');

require('dotenv').config();

const usersRoute = require('./routes/user.route');
const { use } = require('./routes/user.route');
const auth = require('./middleware/auth');
const listingRoute = require('./routes/listing.route');

const app = express();

//use config module to get the privatekey, if no private key set, end the application
if(!config.get("myprivatekey")) {
    console.error("FATAL ERROR: myprivatekey is not defined.");
    process.exit(1);
}

//connect to mongodb 
const uri = process.env.ATLAS_URI;
mongoose
    .connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully...");
})

// mongoose
//   .connect("mongodb://localhost:5000/nodejsauth", { useNewUrlParser: true })
//   .then(() => console.log("Connected to MongoDB..."))
//   .catch(err => console.error("Could not connect to MongoDB..."));

app.use(auth);
app.use(express.json());
app.use(cors());
app.use("/api/users", usersRoute);



const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));