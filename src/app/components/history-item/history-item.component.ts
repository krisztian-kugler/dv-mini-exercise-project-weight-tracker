import { Component, dateFormatter } from "@core";
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
      <div>${this.entry.weight.toFixed(1) + " kg"}</div>
      <div>${dateFormatter(this.entry.date)}</div>
    `;
  }
}
