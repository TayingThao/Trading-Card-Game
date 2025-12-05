import { Schema, model } from "mongoose";
import { InventoryItem } from "../models/inventoryItem";

const InventoryItemSchema = new Schema<InventoryItem>(
  {
    username: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    qty: { type: Number, required: true },
    imgSrc: { type: String, required: true, trim: true }
  },
  { collection: "inventory_items" }
);

const InventoryItemModel = model<InventoryItem>("InventoryItem", InventoryItemSchema);

function index(username: string): Promise<InventoryItem[]> {
  return InventoryItemModel.find({ username });
}

function get(username: string, name: string): Promise<InventoryItem> {
  return InventoryItemModel.find({ username, name })
    .then(list => list[0])
    .catch(() => { throw `${name} Not Found`; });
}

function create(json: InventoryItem): Promise<InventoryItem> {
  const t = new InventoryItemModel(json);
  return t.save();
}

function update(username: string, name: string, item: InventoryItem): Promise<InventoryItem> {
  return InventoryItemModel.findOneAndUpdate({ username, name }, item, {
    new: true
  }).then((updated) => {
    if (!updated) throw `${name} Not Found`;
    return updated;
  });
}

function remove(username: string, name: string): Promise<void> {
  return InventoryItemModel.findOneAndDelete({ username, name }).then((deleted) => {
    if (!deleted) throw `${name} Not Found`;
  });
}

function incrementQty(username: string, name: string, amount: number = 1): Promise<InventoryItem> {
  return InventoryItemModel.findOneAndUpdate(
    { username, name },
    { $inc: { qty: amount } },
    { new: true }
  ).then((updated) => {
    if (!updated) throw `${name} Not Found`;
    return updated;
  });
}

export default { index, get, create, update, remove, incrementQty };