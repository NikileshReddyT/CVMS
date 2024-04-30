const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb");

const app = new express();
app.use(express.json());
app.use(cors());

const client = new MongoClient(
  "mongodb+srv://NikileshReddyT:Nikki%402005@cluster0.en4mm4h.mongodb.net/?retryWrites=true&w=majority"
);
client.connect(); 
console.log("Connected to the database");
const db = client.db("cvms");
const col = db.collection("login data");

app.get("/home", (req, res) => {
  res.send("Home Page");
});

app.post("/insert", async (req, res) => {
  console.log(req.body.email)
  const email = await col.findOne({ email: req.body.email });
  if(email){
    res.json({message: "User already exists"});
    console.log("User already exists");
  }else{
    console.log(req.body);
    col.insertOne(req.body);
    res.send("successfully received");
  }
});

app.get("/showall", async (req, res) => {
  const result = await col.find().toArray();
  res.send(result);
});

app.post("/check", async (req, res) => {
  console.log("entering check");
  const result = await col.findOne({ email: req.body.name });
  if (!result) {
    res.send("User Not Found");
  } else if (result.password == req.body.password) {
    res.send("Login Success");
  } else {
    res.send("Wrong Password");
  }
  //   console.log(result);
  //   console.log(req.body);
});

app.delete("/deleteall", async (req, res) => {
  await col.deleteMany({});
  res.send("deleted all");
});

app.delete("/delete/:id", async (req, res) => {
  const itemId = req.params.id;
  const query = { "_id": new ObjectId(itemId) };

  try {
    const deleted = await col.deleteOne({"_id": new ObjectId(itemId)})
    res.json({ status: 200, message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.json({ status: 500, error: "Error detected" });
  }
});

app.get("/isonline",(req,res)=>{
  res.send("online");
})

app.listen(8081, () => console.log("server running"));
