import { Auth, ThenUpdate } from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model } from "./model";
import { InventoryItem } from "server/models";

export default function update(
  message: Msg,
  model: Model,
  user: Auth.User
): Model | ThenUpdate<Model, Msg> {
  console.log("Update called with message:", message[0], "Current model:", model);
  
  switch (message[0]) {
    case "inventory/request": {
      const { username } = message[1];
      console.log("Requesting inventory for:", username);
      return [
        { ...model, inventory: [] },
        requestInventory(message[1], user)
          .then((inventory) => {
            console.log("Inventory fetched:", inventory);
            return ["inventory/save", { username, inventory }];
          })
      ];
    }
    case "inventory/save": {
      const { inventory } = message[1];
      console.log("Saving inventory to model:", inventory);
      return { ...model, inventory };
    }
    case "store/purchase": {
      const { username } = message[1];
      console.log("Purchasing pack for:", username);
      return [
        model,
        purchasePack(message[1], user)
          .then((inventory) => {
            console.log("Pack purchased, new inventory:", inventory);
            return ["inventory/save", { username, inventory }];
          })
      ];
    }
    case "profile/request": {
      // Profile is handled by auth, just return model unchanged
      return model;
    }
    default: {
      const unhandled: never = message[0];
      throw new Error(`Unhandled message "${unhandled}"`);
    }
  }
}

function requestInventory(
  _payload: { username: string },
  user: Auth.User
): Promise<InventoryItem[]> {
  return fetch(`/api/inventory/`, {
    headers: Auth.headers(user)
  })
    .then((response: Response) => {
      if (response.status === 200) return response.json();
      throw "No Response from server";
    })
    .then((json: unknown) => {
      if (json) return json as InventoryItem[];
      throw "No JSON in response from server";
    });
}

function purchasePack(
  payload: { username: string; packType: string },
  user: Auth.User
): Promise<InventoryItem[]> {
  return fetch(`/api/store`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...Auth.headers(user)
    },
    body: JSON.stringify({ packType: payload.packType })
  })
    .then((response: Response) => {
      if (response.status === 200) return response.json();
      throw "Failed to purchase pack";
    })
    .then((_data: any) => {
      // After purchasing, fetch updated inventory
      return requestInventory({ username: payload.username }, user);
    });
}
