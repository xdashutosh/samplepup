import express from "express";
import { scrap } from "./scrap.js";

const app = express();
const PORT = 5000;

app.use(express.json());

app.get("/scrap", scrap);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});