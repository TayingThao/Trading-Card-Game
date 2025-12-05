import express, { Request, Response } from "express";
import { InventoryItem } from "../models/inventoryItem";
import InventoryItems from "../services/inventoryItem-svc";

const router = express.Router();

router.get("/", (_, res: Response) => {
  InventoryItems.index()
    .then((list: InventoryItem[]) => res.json(list))
    .catch((err) => res.status(500).send(err));
});

router.get("/:name", (req: Request, res: Response) => {
  const { name } = req.params;
  InventoryItems.get(name)
    .then((item: InventoryItem | null) =>
      item ? res.json(item) : res.status(404).send("Not Found")
    )
    .catch((err) => res.status(404).send(err));
});

router.post("/", (req: Request, res: Response) => {
  const newItem = req.body;

  InventoryItems.create(newItem)
    .then((item: InventoryItem) => res.status(201).json(item))
    .catch((err) => res.status(500).send(err));
});

router.put("/:name", (req: Request, res: Response) => {
  const { name } = req.params;
  const updatedItem = req.body;

  InventoryItems.update(name, updatedItem)
    .then((item: InventoryItem) => res.json(item))
    .catch((err) => res.status(404).send(err));
});

router.delete("/:name", (req: Request, res: Response) => {
  const { name } = req.params;

  InventoryItems.remove(name)
    .then(() => res.status(204).send())
    .catch((err) => res.status(404).send(err));
});

export default router;