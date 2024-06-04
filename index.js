const express = require("express");
const app = express();
const cors = require("cors");
// const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
require("dotenv").config();

//middleware
app.use(cors());
app.use(express.json());

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@food-delivery-cluster.0vdi1ak.mongodb.net/?retryWrites=true&w=majority&appName=Food-Delivery-Cluster`
  )
  .then(console.log("mongodb connected successfully"))
  .catch((error) => console.log("error connecting to mongodb", error));

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@food-delivery-cluster.0vdi1ak.mongodb.net/?retryWrites=true&w=majority&appName=Food-Delivery-Cluster`;
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverApi: ServerApiVersion.v1,
// });

// async function run() {
//   try {
//     //database & collections

//     const menuCollection = client.db("foodDelivery").collection("menus");
//     const cartCollection = client.db("foodDelivery").collection("cartItems");

//     //all menu items operations

//     app.get("/menu", async (req, res) => {
//       const query = {};
//       const cursor = menuCollection.find(query);
//       const services = await cursor.toArray();
//       res.send(services);
//     });

//     // posting cart to db

//     app.post("/carts", async (req, res) => {
//       const cartItem = req.body;
//       const result = await cartCollection.insertOne(cartItem);
//       res.send(result);
//     });

//     // get carts using mail

//     app.get("/carts", async (req, res) => {
//       const email = req.query.email;
//       const filter = { email: email };
//       const result = await cartCollection.find(filter).toArray();
//       res.send(result);
//     });

//     // get specific carts

//     app.get("/carts/:id", async (req, res) => {
//       const id = req.params.id;
//       const filter = { _id: new ObjectId(id) };
//       const result = await cartCollection.findOne(filter);
//       res.send(result);
//     });

//     //delete items from cart
//     app.delete("/carts/:id", async (req, res) => {
//       const id = req.params.id;
//       const filter = { _id: new ObjectId(id) };
//       const result = await cartCollection.deleteOne(filter);
//       res.send(result);
//     });

//     // updates carts quantity
//     app.put("/carts/:id", async (req, res) => {
//       const id = req.params.id;
//       const { quantity } = req.body;
//       const filter = { _id: new ObjectId(id) };
//       const options = { upset: true };

//       // Specify the update to set a value for the plot field
//       const updateDoc = {
//         $set: {
//           quantity: parseInt(quantity, 10),
//         },
//       };
//       const result = await cartCollection.updateOne(filter, updateDoc, options);
//     });
//   } finally {
//     // Ensures that the client will close when you finish/error
//     // await client.close();
//   }
// }
// run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
