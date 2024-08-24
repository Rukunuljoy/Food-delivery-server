const express = require("express");
const app = express();
const cors = require("cors");
// const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
require("dotenv").config();
const jwt = require('jsonwebtoken')
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


// console.log(process.env.ACCESS_TOKEN)

//middleware
app.use(cors());
app.use(express.json());

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@food-delivery-cluster.0vdi1ak.mongodb.net/foodDelivery?retryWrites=true&w=majority&appName=Food-Delivery-Cluster`
  )
  .then(console.log("mongodb connected successfully"))
  .catch((error) => console.log("error connecting to mongodb", error));

  //jwt authentication
  app.post('/jwt', async (req, res) => {
    const user = req.body;
    const token = jwt.sign(user,process.env.ACCESS_TOKEN, {
      expiresIn: '1hr'
    })
    res.send({token})
  })



  //import routes here
  const MenuRoutes = require('./api/routes/MenuRoutes');
  const cartRoutes = require('./api/routes/cartRoutes')
  const UserRoutes = require('./api/routes/UserRoutes')
  app.use('/menu', MenuRoutes);
  app.use('/carts',cartRoutes);
  app.use('/users', UserRoutes);

  // stripe payment routes 
  app.post("/create-payment-intent", async (req, res) => {
    const { price } = req.body;
    const amount = price*100;
  
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      payment_method_types: ["card"],
    });
  
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  });

  


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
