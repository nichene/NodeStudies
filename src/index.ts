import express from "express";
import graphqlHTTP from "express-graphql";
const schema = require("./schema/schema");
const app = express();

import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/SmartFit");

mongoose.connection.once("open", () => {
  console.log("conneted to database");
});

mongoose.connection.on("error", (err) => {
  console.log("Database error: " + err);
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
