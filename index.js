const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

require('dotenv').config()


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lion9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;


const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});



async function run() {
  try {
    await client.connect();
    const productCollection = client.db("eshop").collection("products");
    console.log("Connected")
    app.get("/products", async(req, res)=>{
      const query ={}
      const cursor = productCollection.find(query);
      const products = await cursor.toArray();
      res.send(products)
      // console.log(products)
    })

    app.get("/productcount", async(req,res)=>{
      const query = {}
      const cursor = productCollection.find(query)
      const count = await cursor.count();
      // res.json(count)
      res.json({count})
    })
  } finally {
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Running");
});


app.listen(port, () => {
  console.log("Server running", port);
});
