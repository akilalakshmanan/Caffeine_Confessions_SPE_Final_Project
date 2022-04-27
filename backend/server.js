import express from 'express';
import data from './data.js';
import cors from 'cors';
import mongoose from 'mongoose';
import ServerApiVersion from 'mongodb';
import productRouter from './routes/productRoutes.js';

const app = express();
app.use(cors());

const username = "akila_l";
const password = "ZUUQsnjqABxzkWFv";
const cluster = "caffconfclstr0.gbbqp";
const dbname = "myFirstDatabase";
mongoose.connect(
  `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`, 
  // {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  //   serverApi: ServerApiVersion.v1
  // }
);
console.log(mongoose);
const db = mongoose.connection;
console.log(db);
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully to mongoDB");
});

app.use('/api/products', productRouter);

// app.get('/api/products', (req, res) => {
//   res.send(data.products);
// });

const port = process.env.port || 5000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
