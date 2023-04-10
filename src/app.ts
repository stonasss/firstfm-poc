import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/index.js";
import { handleApplicationErrors } from "./middlewares/error-middlewares.js";

dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());
server.use(router);
server.use(handleApplicationErrors);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server running on port ${port}`));
