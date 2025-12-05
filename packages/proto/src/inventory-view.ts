import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { Observer, Auth } from "@calpoly/mustang";
import "./inventory-card.js";

interface InventoryItem {
    _id: string;
    name: string;
    qty: number;
    imgSrc: string;
}

export class InventoryViewElement extends LitElement {
@property({ type: String })
src?: string;

@state()
items: InventoryItem[] = [];

_authObserver = new Observer<Auth.Model>(this, "trading:auth");
_authModel?: Auth.Model;

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
      if (this.src) {
        this.hydrate(this.src);
      }
    });
}

hydrate(src: string) {
    fetch(src, {
      headers: this.authorization || {}
    })
    .then(res => res.json())
    .then((json: any) => {
        if(json)    {
            this.items = json.map((obj: any) => ({
                _id: obj._id,
                name: obj.name,
                qty: obj.qty,
                imgSrc: obj.imgSrc
            }));
        }
    })
}

renderItem(item: InventoryItem) {
    return html`
      <inventory-card img-src=${item.imgSrc} qty=${item.qty}>
        ${item.name}
      </inventory-card>
    `;
}

override render() {
    return html`
        <div class="inventory-grid">
            ${this.items.map(this.renderItem)}
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