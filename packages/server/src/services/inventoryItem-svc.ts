import { Schema, model } from "mongoose";
import { InventoryItem } from "../models/inventoryItem";

const InventoryItemSchema = new Schema<InventoryItem>(
  {
    name: { type: String, required: true, trim: true },
    qty: { type: Number, required: true },
    imgSrc: { type: String, required: true, trim: true }
  },
  { collection: "inventory_items" }
);

const InventoryItemModel = model<InventoryItem>("InventoryItem", InventoryItemSchema);

function index(): Promise<InventoryItem[]> {
  return InventoryItemModel.find();
}

function get(name: string): Promise<InventoryItem> {
  return InventoryItemModel.find({ name })
    .then(list => list[0])
    .catch(() => { throw `${name} Not Found`; });
}

function create(json: InventoryItem): Promise<InventoryItem> {
  const t = new InventoryItemModel(json);
  return t.save();
}

function update(name: string, item: InventoryItem): Promise<InventoryItem> {
  return InventoryItemModel.findOneAndUpdate({ name }, item, {
    new: true
  }).then((updated) => {
    if (!updated) throw `${name} Not Found`;
    return updated;
  });
}

function remove(name: string): Promise<void> {
  return InventoryItemModel.findOneAndDelete({ name }).then((deleted) => {
    if (!deleted) throw `${name} Not Found`;
  });
}

export default { index, get, create, update, remove };