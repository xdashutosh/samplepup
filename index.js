import express from "express";
import { scrap } from "./scrap.js";
import { routes } from "./routes.js";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();
const PORT = 5000;


const corsOptions = {
  origin: '*',
};

app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
routes(app);
