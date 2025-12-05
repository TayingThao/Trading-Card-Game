import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";

export class InventoryCardElement extends LitElement {
  @property({ attribute: "img-src" }) imgSrc?: string;
  @property({ type: Number }) qty = 0;

  override render() {
    return html`
      <div class="card">
        <img src="${this.imgSrc}" alt="Card image" />
        <div class="qty">×${this.qty}</div>
        <div class="name"><slot></slot></div>
      </div>
    `;
  }

  static styles = css`
  .card {
      width: 200px;
      text-align: center;
      font-family: sans-serif;
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 4px;
    }

    img {
      width: 100%;
      display: block;
      border-radius: 4px;
    }

    .qty {
      font-weight: bold;
      margin-top: 2px;
    }
  `;
}

customElements.define("inventory-card", InventoryCardElement);
