import { define, View, Auth, Observer } from "@calpoly/mustang";
import { html, css } from "lit";
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
      <div class="inventory-grid">
        ${inventory.map((item) => html`
          <inventory-card img-src=${item.imgSrc} qty=${item.qty}>
            ${item.name}
          </inventory-card>
        `)}
      </div>
    `;
  }

  static styles = css`
    .inventory-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      padding: 10px;
    }
  `;
}
