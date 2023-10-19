const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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
    // await client.connect();
    const database = client.db("gadgetDB");
    const gadgetCollection = database.collection("gadgets");
    const cartDatabase = client.db("gadgetDB");
    const cartCollection = cartDatabase.collection("cart");

    app.get("/cart", async (req, res) => {
      const cursor = cartCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/product", async (req, res) => {
      const cursor = gadgetCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // get apple products
    app.get("/apple", async (req, res) => {
      const cursor = gadgetCollection.find({ brand: "Apple" });
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/apple/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await gadgetCollection.findOne(query);
      res.send(result);
    });

    // get lenovo products
    app.get("/lenovo", async (req, res) => {
      const cursor = gadgetCollection.find({ brand: "Lenovo" });
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/lenovo/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await gadgetCollection.findOne(query);
      res.send(result);
    });
    // get vivo products
    app.get("/vivo", async (req, res) => {
      const cursor = gadgetCollection.find({ brand: "Vivo" });
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/vivo/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await gadgetCollection.findOne(query);
      res.send(result);
    });

    // samsung product api
    app.get("/samsung", async (req, res) => {
      const cursor = gadgetCollection.find({ brand: "Samsung" });
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/samsung/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await gadgetCollection.findOne(query);
      res.send(result);
    });

    /// HP (Hewlett-Packard)
    //hp get laptop api
    app.get("/hp", async (req, res) => {
      const cursor = gadgetCollection.find({ brand: "HP (Hewlett-Packard)" });
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/hp/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await gadgetCollection.findOne(query);
      res.send(result);
    });

    app.post("/product", async (req, res) => {
      const newProduct = req.body;
      console.log(newProduct);
      const result = await gadgetCollection.insertOne(newProduct);
      res.send(result);
    });

    // cart api
    //user related api
    app.post("/cart", async (req, res) => {
      const newCart = req.body;
      console.log(newCart);
      const result = await cartCollection.insertOne(newCart);
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
