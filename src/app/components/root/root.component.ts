import { Component } from "@core";
import EventService from "../../services/event.service";
import StorageService from "../../services/storage.service";
import "./root.component.scss";

@Component({
  selector: "wt-root",
  providers: [EventService, StorageService]
})
export default class RootComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = /*html*/ `
      <header>
        <h1 id="header">Weight Tracker</h1>
        <wt-form></wt-form>
      </header>
      <wt-history></wt-history>
      <footer></footer>
    `;
  }
}
