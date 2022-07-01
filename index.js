
basic part1==============
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

====================basic end===========


=====================================
================full setup===============
const express = require("express");
const cors = require("cors");

require("dotenv").config();
//connection
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const port = process.env.PORT || 5000;
const app = express();

//middleware
app.use(cors());
app.use(express.json());

//connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.asff6.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// ==========================
async function run() {
  try {
    await client.connect();

    //itemsCollection=============
    const itemsCollection = client.db("tools_manufacturer").collection("items");

    // //=for payment for order==========
    app.get("/orders", async (req, res) => {
      const id = req.params.id;
      const query = { _id: id };
      const order = await itemsCollection.findOne(query);
      res.send(order);
    });
  } finally {
  }
}
run().catch(console.dir);

console.log("all route ok");

//root api
app.get("/", (req, res) => {
  res.send("Running Tools manufacturer Server.");
});

//heroku
app.get("/hero", (req, res) => {
  res.send("Meet with heroku");
});

app.listen(port, () => {
  console.log("Tools manufacturer Listening to port", port);
});