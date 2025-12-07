import { View, Auth, Observer } from "@calpoly/mustang";
import { html, css } from "lit";
import { state } from "lit/decorators.js";
import { Msg } from "../messages";
import { Model } from "../model";

export class StoreViewElement extends View<Model, Msg> {
  @state()
  username?: string;

  @state()
  message?: string;

  @state()
  error?: string;

  _authObserver = new Observer<Auth.Model>(this, "trading:auth");

  constructor() {
    super("trading:model");
  }

  connectedCallback() {
    super.connectedCallback();
    
    this._authObserver.observe((auth: Auth.Model) => {
      if (auth.user?.authenticated) {
        this.username = auth.user.username;
      }
    });
  }

  handleBuyPack(e: Event) {
    e.preventDefault();
    this.message = undefined;
    this.error = undefined;

    if (!this.username) {
      this.error = "Please log in to purchase packs";
      return;
    }

    this.dispatchMessage([
      "store/purchase",
      { username: this.username, packType: "pack1" }
    ]);

    // Show success message (the actual inventory update happens through the store)
    this.message = "Purchase request sent! Check your inventory.";
  }

  render() {
    return html`
      <div class="store-container">
        <h1>Buy a pack!</h1>
        <p>Packs cost 20 coins</p>
        
        ${this.message ? html`<p class="success">${this.message}</p>` : ''}
        ${this.error ? html`<p class="error">${this.error}</p>` : ''}
        
        <form class="buy-form" @submit=${this.handleBuyPack}>
          <dl>
            <dt>Pack 1</dt>
            <dd>Contains 5 random cards</dd>
          </dl>
          <button type="submit">Buy Pack</button>
        </form>
      </div>
    `;
  }

  static styles = css`
    .store-container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    h1 {
      margin-top: var(--size-spacing-medium, 1rem);
      margin-bottom: var(--size-spacing-small, 0.5rem);
    }

    p {
      color: var(--color-text-main);
      font-size: var(--font-size-main-text);
      margin: 20px;
    }

    .buy-form {
      background-color: var(--color-background-list);
      padding: 30px;
      display: flex;
      flex-direction: column;
    }

    .buy-form dl {
      margin-bottom: 20px;
    }

    .buy-form dt {
      font-weight: bold;
      margin-bottom: 10px;
    }

    .buy-form dd {
      margin-left: 0;
    }

    button {
      padding: 10px 20px;
      background-color: #007bff;
      color: white;
      border: 2px solid #0056b3;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
      font-weight: bold;
    }

    button:hover {
      background-color: #0056b3;
      border-color: #004085;
    }

    .success {
      color: green;
      font-weight: bold;
    }

    .error {
      color: red;
      font-weight: bold;
    }
  `;
}
