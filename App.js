const express = require("express");
const mongoose = require("mongoose");
const CheckShema = require("./Model/CheckShema");

const CheckedModel = mongoose.model("checkedList", CheckShema);
const app = express();
const port = 8000;
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/checkList", {
  useNewUrlParser: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected to MogoDb");
});

app.get("/getCheckList", async (req, res) => {
  const checkedList = await CheckedModel.find();
  if (checkedList) {
    res.status(200).send(checkedList);
  } else {
    res.status(500).send("Internal Server error");
  }
});

app.post("/addCheckedList", async (req, res) => {
  body = req.body;
  if (body) {
    CheckedModel.create(body);
    res.status(200).send(body);
  } else {
    res.send(400).send("Bad Reqest");
  }
});

app.put("/updateCheckedList", async (req, res) => {
  id = req.body.id;
  isChecked = req.body.isChecked;

  if (id) {
    const data = await CheckedModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          isChecked: isChecked,
        },
      },
      {
        returnDocument: "after",
      }
    );
    if (data) {
      res.status(200).send(data);
    }
  } else {
    res.status(400).send("Bad Request");
  }
});

app.listen(port, () => {
  console.log(`Server is Running on Port ${port}`);
});
