import { View, Auth, Observer, Form, define } from "@calpoly/mustang";
import { html, css } from "lit";
import { state } from "lit/decorators.js";
import { Msg } from "../messages";
import { Model } from "../model";

interface PurchaseForm {
  packType: string;
}

export class StoreViewElement extends View<Model, Msg> {
  static uses = define({
    "mu-form": Form.Element
  });

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

  handleSubmit(event: Form.SubmitEvent<PurchaseForm>) {
    this.message = undefined;
    this.error = undefined;

    if (!this.username) {
      this.error = "Please log in to purchase packs";
      return;
    }

    this.dispatchMessage([
      "store/purchase",
      { 
        username: this.username, 
        packType: event.detail.packType 
      },
      {
        onSuccess: () => {
          this.message = "Pack purchased successfully! Check your inventory.";
        },
        onFailure: (error: Error) => {
          this.error = `Failed to purchase pack: ${error.message}`;
        }
      }
    ]);
  }

  render() {
    return html`
      <link rel="stylesheet" href="/styles/store.css">
      <main>
        <h1>Buy a pack!</h1>
        <p>Packs cost 20 coins</p>
        
        ${this.message ? html`<p class="success">${this.message}</p>` : ''}
        ${this.error ? html`<p class="error">${this.error}</p>` : ''}
        
        <mu-form 
          class="buy-form" 
          @mu-form:submit=${this.handleSubmit}>
          <input type="hidden" name="packType" value="pack1" />
          <dl>
            <dt>Pack 1</dt>
            <dd>Contains 5 random cards</dd>
          </dl>
          <button type="submit">Buy Pack</button>
        </mu-form>
      </main>
    `;
  }

  static styles = css`
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
