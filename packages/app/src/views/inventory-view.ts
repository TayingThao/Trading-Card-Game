import { define, View, Auth, Observer } from "@calpoly/mustang";
import { html } from "lit";
import { Msg } from "../messages";
import { Model } from "../model";
import { InventoryCardElement } from "../components/inventory-card";

export class InventoryViewElement extends View<Model, Msg> {
  static uses = define({
    "inventory-card": InventoryCardElement
  });

  _authObserver = new Observer<Auth.Model>(this, "trading:auth");

  constructor() {
    super("trading:model");
  }

  connectedCallback() {
    super.connectedCallback();
    
    this._authObserver.observe((auth: Auth.Model) => {
      if (auth.user?.authenticated) {
        const username = auth.user.username;
        this.dispatchMessage([
          "inventory/request",
          { username }
        ]);
      }
    });
  }

  render() {
    const { inventory = [] } = this.model;
    return html`
      <link rel="stylesheet" href="/styles/inventory.css">
      <main>
        <ul class="inventory-list">
          ${inventory.map((item) => html`
            <li>
              <inventory-card img-src=${item.imgSrc} qty=${item.qty}>
                ${item.name}
              </inventory-card>
            </li>
          `)}
        </ul>
      </main>
    `;
  }
}
