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
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@food-delivery-cluster.0vdi1ak.mongodb.net/foodDelivery?retryWrites=true&w=majority&appName=Food-Delivery-Cluster`
  )
  .then(console.log("mongodb connected successfully"))
  .catch((error) => console.log("error connecting to mongodb", error));

  //import routes here
  const MenuRoutes = require('./api/routes/MenuRoutes');
  const cartRoutes = require('./api/routes/cartRoutes')
  const UserRoutes = require('./api/routes/UserRoutes')
  app.use('/menu', MenuRoutes);
  app.use('/carts',cartRoutes);
  app.use('/users', UserRoutes);


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
