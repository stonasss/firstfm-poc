import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
var server = express();
server.use(cors());
server.use(express.json());
var port = process.env.PORT || 5000;
server.listen(port, function () { return console.log("Server running on port ".concat(port)); });
