import express from "express";
import bodyParser from "body-parser";
import http from "http";
import "dotenv/config";
import { router } from "./routers/index.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.get("/", (req, res) => {
  console.log("app is running");
  res.send({ message: "ok" });
});
app.use("/", router);

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
