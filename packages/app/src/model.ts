import { InventoryItem } from "server/models";

export interface Model {
  inventory?: InventoryItem[];
}

export const init: Model = {};
