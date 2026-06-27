import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


const uri = process.env.MONGODB_URI || "";
const port = process.env.PORT || 5000;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



const db = client.db("Expense-Tracker");
const expenseCollection = db.collection("expenses");


app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});




app.get("/api/expense", async (req: Request, res: Response) => {
  const { category, date } = req.query;
  const query: any = {};
  if (category && category !== "All") {
    query.category = {
      $regex: `^${category}$`,
      $options: "i",
    };
  }
  if (date) { query.date = date; }
  const result = await expenseCollection.find(query).toArray(); res.send(result);
});


app.post("/api/expense", async (req: Request, res: Response) => {
  const expense = req.body;
  const result = await expenseCollection.insertOne(expense);
  res.send(result);
});


app.delete("/api/expense/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const query = { _id: new ObjectId(id as string) };
  const result = await expenseCollection.deleteOne(query);
  res.send(result);
});




app.patch('/api/expense/:id', async (req, res) => {
  const { id } = req.params;
  const { _id, ...updateData } = req.body;

  const filter = { _id: new ObjectId(id) };
  const updateDoc = { $set: updateData };

  const result = await expenseCollection.updateOne(filter, updateDoc);
  res.send(result);
});


app.listen(process.env.PORT, () => {
  console.log("Server is running on port", process.env.PORT);
});