import { View } from "@calpoly/mustang";
import { html } from "lit";
import { Msg } from "../messages";
import { Model } from "../model";

export class HomeViewElement extends View<Model, Msg> {
  constructor() {
    super("trading:model");
  }

  render() {
    return html`
      <link rel="stylesheet" href="/styles/index.css">
      <main>
        <p>Updates</p>
        <dl class="updates">
          <dt class="update-item">Oct 18</dt>
          <dd class="update-description">We deployed! Everything is almost as good as it could be.</dd>
          <dt class="update-item">Update 0</dt>
          <dd class="update-description">Added a card page</dd>
        </dl>
      </main>
    `;
  }
}
