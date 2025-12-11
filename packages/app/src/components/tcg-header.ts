import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { Observer, Auth, Events } from "@calpoly/mustang";

export class TCGHeaderElement extends LitElement {
  @property({ type: String })
  page: string = "Home";

  _authObserver = new Observer<Auth.Model>(this, "trading:auth");

  @state()
  loggedIn = false;

  @state()
  userid?: string;

  connectedCallback() {
    super.connectedCallback();

    this._authObserver.observe((auth: Auth.Model) => {
      const { user } = auth;

      if (user && user.authenticated ) {
        this.loggedIn = true;
        this.userid = user.username;
      } else {
        this.loggedIn = false;
        this.userid = undefined;
      }
    });

    // Initialize theme from localStorage
    this.initializeTheme();
  }

  initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.body.classList.remove('dark-mode', 'light-mode');
      document.body.classList.add(savedTheme);
    }
  }

  handleThemeToggle(e: Event) {
    const checkbox = e.target as HTMLInputElement;
    const theme = checkbox.checked ? 'light-mode' : 'dark-mode';
    document.body.classList.remove('dark-mode', 'light-mode');
    document.body.classList.add(theme);
    localStorage.setItem('theme', theme);
  }

  render() {
    return html`
      <header>
        <img class="logo" src="/icons/TCGicon.jpg" alt="Game Logo" width="100">
        <div>
          <h1>Trading Card Game</h1>
          <nav>
            <a href="/app">Home</a> |
            <a href="/app/profile">Profile</a> |
            <a href="/app/inventory">Inventory</a> |
            <a href="/app/store">Store</a> |
          </nav>
        </div>
        <h2>${this.page}</h2>
        <a slot="actuator">
          Hello, ${this.userid || "traveler"}
        </a>
        ${this.loggedIn ? this.renderSignOutButton() : this.renderSignInButton()}
        <label>
          <input 
            type="checkbox" 
            id="toggleDarkMode"
            .checked=${localStorage.getItem('theme') === 'light-mode'}
            @change=${this.handleThemeToggle}
          />
          Light mode
        </label>
      </header>
    `;
  }

  renderSignOutButton() {
    return html`
      <button
        @click=${(e: UIEvent) => {
          Events.relay(e, "auth:message", ["auth/signout"])
        }}
      >
        Sign Out
      </button>
    `;
  }

  renderSignInButton() {
    return html`
      <a href="/login.html" @click=${(e: Event) => {
        e.preventDefault();
        window.location.href = "/login.html";
      }}>
        Sign In…
      </a>
    `;
  }

  static styles = css`
    header {
      display: flex;
      align-items: center;
      justify-content: left;
      padding: var(--header-padding);
      background-color: var(--color-background-header);
      color: var(--color-text-header);
      text-align: var(--header-text-align);
      font-family: var(--font-family-header);
    }

    .logo {
      border-radius: var(--logo-border-radius);
      margin-right: var(--header-spacing);
      width: var(--logo-size);
    }

    h1 {
      font-size: var(--font-size-title);
      margin: 0;
    }

    h2 {
      margin-left: var(--header-spacing);
      margin-top: 0;
      margin-bottom: 0;
      margin-right: 20px;
    }

    nav {
      padding: var(--navigation-padding);
      font-size: var(--font-size-header-nav);
      margin-top: var(--size-spacing-small, 0.5rem);
    }

    nav a {
      color: var(--header-text-color);
      text-decoration: none;
      font-size: var(--font-size-header-nav);
    }

    nav a:hover {
      text-decoration: underline;
    }

    label {
      font-size: var(--font-size-header-nav);
      margin-left: var(--header-spacing);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    img {
      border-radius: var(--logo-border-radius);
      margin-right: var(--header-spacing);
      width: var(--logo-size);
    }
  `;
}
