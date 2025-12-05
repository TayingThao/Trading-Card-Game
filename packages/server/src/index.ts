import express, { Request, Response } from "express";
import { connect } from "./services/mongo";
import inventoryRouter from "./routes/inventory";
import storeRouter from "./routes/store";
import auth, { authenticateUser } from "./routes/auth";


connect("cards");

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.static(staticDir));

app.use(express.json());

app.use("/api/inventory", authenticateUser, inventoryRouter);

app.use("/api/store", authenticateUser, storeRouter);

app.use("/auth", auth);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
