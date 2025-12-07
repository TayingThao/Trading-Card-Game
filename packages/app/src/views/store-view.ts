import { html, css, LitElement } from "lit";
import { state } from "lit/decorators.js";
import { Observer, Auth } from "@calpoly/mustang";

export class StoreViewElement extends LitElement {
  @state()
  message?: string;

  @state()
  error?: string;

  _authObserver = new Observer<Auth.Model>(this, "trading:auth");
  _authModel?: Auth.Model;

  get src() {
    return "/api/store";
  }

  get authorization() {
    return (
      this._authModel?.user?.authenticated && {
        Authorization:
          `Bearer ${(this._authModel.user as Auth.AuthenticatedUser).token}`
      }
    );
  }

  connectedCallback() {
    super.connectedCallback();
    
    this._authObserver.observe((auth: Auth.Model) => {
      this._authModel = auth;
    });
  }

  handleBuyPack(e: Event) {
    e.preventDefault();
    this.message = undefined;
    this.error = undefined;

    fetch(this.src, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(this.authorization || {})
      },
      body: JSON.stringify({ packType: "pack1" })
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(`Failed to purchase pack: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      this.message = `Successfully purchased pack! Added ${data.cardsAdded || 5} cards to your inventory.`;
    })
    .catch((err) => {
      this.error = err.message || "Failed to purchase pack";
    });
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
