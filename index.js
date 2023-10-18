const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

//dreamgadgetmaster
//2FxoxJE8PM2L55Oh

const uri =
  "mongodb+srv://dreamgadgetmaster:2FxoxJE8PM2L55Oh@cluster0.rjnekog.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const database = client.db("gadgetDB");
    const gadgetCollection = database.collection("gadgets");

    app.get("/product", async (req, res) => {
      const cursor = gadgetCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    app.post("/product", async (req, res) => {
      const newProduct = req.body;
      console.log(newProduct);
      const result = await gadgetCollection.insertOne(newProduct);
      res.send(result);
    });
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", async (req, res) => {
  res.send("Dream gadget server is running");
});

app.listen(port, () => {
  console.log(`Dream gadget is running on port ${port}`);
});
