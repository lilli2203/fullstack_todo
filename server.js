const mongoose = require("mongoose");
const app = require("./index");

mongoose.connect(
  "mongodb+srv://partharora2233:partharora@cluster0.qojfnju.mongodb.net/",
  { dbName: "todoc" }
);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection established successfully");
});

mongoose.connection.on("error", (err) => {
  console.log(`failed to connect to MongoDB ${err}`);
});

app.listen(3000, () => {
  console.log("App started on the port 3000");
});
