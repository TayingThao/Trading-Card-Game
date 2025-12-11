import { Auth, ThenUpdate } from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model } from "./model";
import { InventoryItem } from "server/models";

export default function update(
  message: Msg,
  model: Model,
  user: Auth.User
): Model | ThenUpdate<Model, Msg> {
  switch (message[0]) {
    case "inventory/request": {
      const { username } = message[1];
      return [
        { ...model, inventory: [] },
        requestInventory(message[1], user)
          .then((inventory) => ["inventory/save", { username, inventory }])
      ];
    }
    case "inventory/save": {
      const { inventory } = message[1];
      return { ...model, inventory };
    }
    case "store/purchase": {
      const { username } = message[1];
      const callbacks = message[2];
      return [
        model,
        purchasePack(message[1], user, callbacks)
          .then((inventory) => ["inventory/save", { username, inventory }] as Msg)
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
  user: Auth.User,
  callbacks: { onSuccess?: () => void; onFailure?: (err: Error) => void }
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
      throw new Error("Failed to purchase pack");
    })
    .then((_data: any) => {
      // After purchasing, fetch updated inventory
      return requestInventory({ username: payload.username }, user);
    })
    .then((inventory: InventoryItem[]) => {
      // Call onSuccess callback after successful purchase
      if (callbacks.onSuccess) callbacks.onSuccess();
      return inventory;
    })
    .catch((err: Error) => {
      // Call onFailure callback if something went wrong
      if (callbacks.onFailure) callbacks.onFailure(err);
      throw err; // Re-throw to prevent the .then() chain in update from continuing
    });
}
