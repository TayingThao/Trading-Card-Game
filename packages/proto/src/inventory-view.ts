import { html, css, LitElement } from "lit";

export class InventoryViewElement extends LitElement {
  override render() {
    return html`
      <div class="inventory-grid">
        <slot></slot>
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

customElements.define("inventory-view", InventoryViewElement);