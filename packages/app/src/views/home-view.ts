import { View } from "@calpoly/mustang";
import { html, css } from "lit";
import { Msg } from "../messages";
import { Model } from "../model";

export class HomeViewElement extends View<Model, Msg> {
  constructor() {
    super("trading:model");
  }

  render() {
    return html`
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

    .updates {
      max-width: 400px;
      color: rgb(0, 0, 0);
      background-color: rgb(255, 255, 255);
      padding: 30px;
    }

    .update-item::before {
      content: "- ";
    }

    .update-item {
      font-size: 20px;
    }

    .update-description {
      font-size: 15px;
      margin-bottom: 15px;
      margin-left: 40px;
    }
  `;
}
