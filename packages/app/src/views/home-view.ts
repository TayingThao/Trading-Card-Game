import { css, html, LitElement } from "lit";

export class HomeViewElement extends LitElement {
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
    main {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-family: var(--font-family-main);
    }

    main p {
      color: var(--color-text-main);
      font-size: var(--font-size-main-text);
      margin: 20px;
    }

    .updates {
      max-width: 400px;
      color: var(--color-text-list);
      background-color: var(--color-background-list);
      padding: 30px;
    }

    .update-item::before {
      content: "- ";
    }

    .update-item {
      font-size: var(--font-size-list-term);
    }

    .update-description {
      font-size: var(--font-size-list-definition);
      margin-bottom: 15px;
      margin-left: 40px;
    }
  `;
}
