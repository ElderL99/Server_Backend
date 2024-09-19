const mongoose = require('mongoose');
require('dotenv').config();

const DB_User =  "AdanLugo";
const DB_Password =  "Papasconqueso1";
const DB_Name =  "Kodemia";
const DB_Host =  "kod-01.dwjstu1.mongodb.net";
const link = `mongodb+srv://${DB_User}:${DB_Password}@${DB_Host}/${DB_Name}?retryWrites=true&w=majority`;

function connect() {
    return mongoose.connect(link, {
    })
    .then(() => {
        console.log("Database connected successfully.");
    })
    .catch((error) => {
        console.error("Error connecting to the database:", error);
    });
}

module.exports = { connect };