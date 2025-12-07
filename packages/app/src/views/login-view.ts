import { css, html } from "lit";
import { View, define } from "@calpoly/mustang";
import { Msg } from "../messages";
import { Model } from "../model";
import { LoginFormElement } from "../auth/login-form";

export class LoginViewElement extends View<Model, Msg> {
  static uses = define({
    "login-form": LoginFormElement
  });

  constructor() {
    super("trading:model");
  }

  render() {
    return html`
      <main class="login-container">
        <h2>User Login</h2>
        <div class="card">
          <login-form api="/auth/login">
            <label>
              <span>Username:</span>
              <input name="username" autocomplete="off" />
            </label>
            <label>
              <span>Password:</span>
              <input type="password" name="password" />
            </label>
          </login-form>
        </div>
        <p>
          Or did you want to
          <a href="/app">Go to Home</a>?
        </p>
      </main>
    `;
  }

  static styles = css`
    .login-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2rem;
    }

    h2 {
      margin-bottom: 1rem;
    }

    .card {
      background-color: var(--color-background-list, #f5f5f5);
      padding: 2rem;
      border-radius: 8px;
      min-width: 300px;
    }

    label {
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;
    }

    span {
      margin-bottom: 0.5rem;
      font-weight: bold;
    }

    input {
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    p {
      margin-top: 1rem;
    }

    a {
      color: var(--color-link, #007bff);
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }
  `;
}
