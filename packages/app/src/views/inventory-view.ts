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

  static styles = css`
    * {
      margin: 0;
      box-sizing: border-box;
    }

    main {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-family: cursive;
    }

    main p {
      color: rgb(255, 255, 255);
      font-size: 20px;
      margin: 20px;
    }

    .inventory-list {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      list-style-type: none;
    }

    .inventory-img {
      border-radius: 10%;
    }

    .sell-form {
      background-color: rgb(255, 255, 255);
      padding: 30px;
      display: flex;
      flex-direction: column;
    }

    .sell-form ul {
      list-style-type: none;
      line-height: 2;
    }
  `;
}
