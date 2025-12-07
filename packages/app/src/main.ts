import {
  Auth,
  define,
  History,
  Switch
} from "@calpoly/mustang";
import { html } from "lit";
import { TCGHeaderElement } from "./components/tcg-header";
import { HomeViewElement } from "./views/home-view";
import { InventoryViewElement } from "./views/inventory-view";
import { StoreViewElement } from "./views/store-view";

const routes: Switch.Route[] = [
  {
    path: "/app/inventory",
    view: () => html`
      <inventory-view></inventory-view>
    `
  },
  {
    path: "/app/store",
    view: () => html`
      <store-view></store-view>
    `
  },
  {
    path: "/app/profile",
    view: () => html`
      <profile-view></profile-view>
    `
  },
  {
    path: "/app",
    view: () => html`
      <home-view></home-view>
    `
  },
  {
    path: "/",
    redirect: "/app"
  }
];

define({
  "mu-auth": Auth.Provider,
  "mu-history": History.Provider,
  "mu-switch": class AppSwitch extends Switch.Element {
    constructor() {
        super(routes, "trading:history", "trading:auth");
    }
    },
  "tcg-header": TCGHeaderElement,
  "home-view": HomeViewElement,
  "inventory-view": InventoryViewElement,
  "store-view": StoreViewElement
});
