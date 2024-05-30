const express = require('express')
const app = express()
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;
require("dotenv").config();


//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@food-delivery-cluster.0vdi1ak.mongodb.net/?retryWrites=true&w=majority&appName=Food-Delivery-Cluster`
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
  try {
    //database & collections

    const menuCollection = client.db("foodDelivery").collection("menus")
    const cartCollection = client.db("foodDelivery").collection("cartItems")

    //all menu items operations

    app.get('/menu', async (req, res) => {
      const query = {};
      const cursor = menuCollection.find(query)
      const services = await cursor.toArray();
      res.send(services);
    })
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})