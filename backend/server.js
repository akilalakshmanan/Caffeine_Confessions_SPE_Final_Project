import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './routes/userRoutes.js'
import productRouter from './routes/productRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully to mongoDB");
});

app.use('/api/products', productRouter);
app.use('/api/users', userRouter);

// app.get('/api/products', (req, res) => {
//   res.send(data.products);
// });

const port = process.env.port || 5000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
