import { InventoryItem } from "server/models";

export type Msg =
  | ["inventory/request", { username: string }]
  | [
      "store/purchase",
      { username: string; packType: string },
      {
        onSuccess?: () => void;
        onFailure?: (err: Error) => void;
      }
    ]
  | ["profile/request", { username: string }]
  | Cmd;

type Cmd =
  | ["inventory/save", { username: string; inventory: InventoryItem[] }];

