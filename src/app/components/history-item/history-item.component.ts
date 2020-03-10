import { Component } from "@core";
import { Entry } from "src/app/models/entry.model";
import "./history-item.component.scss";

@Component({
  selector: "wt-history-item"
})
export default class HistoryItemComponent extends HTMLElement {
  entry: Entry;

  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = /*html*/ `
      <div>${this.entry.weight + "kg"}</div>
      <div>${this.entry.date.toDateString()}</div>
    `;
  }
}
