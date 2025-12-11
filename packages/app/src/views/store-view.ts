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
        </mu-form>
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
      padding-top: 1rem;
    }

    main h1 {
      margin-top: 1rem;
      margin-bottom: 0.5rem;
    }

    main p {
      color: rgb(255, 255, 255);
      font-size: 20px;
      margin: 20px;
    }

    .buy-form {
      background-color: rgb(255, 255, 255);
      padding: 30px;
      display: flex;
      flex-direction: column;
    }

    .buy-form dl {
      list-style-type: none;
      line-height: 2;
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
