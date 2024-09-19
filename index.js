require("dotenv").config();

const server = require("./server");
const db = require("./src/lib/db");

const port = process.env.PORT || 10000;

db.connect()
  .then(() => {
    server.listen(port, () => {
      console.log("server is running", port);
    });
  })
  .catch((error) => {
    console.log("error", error);
  });

  
